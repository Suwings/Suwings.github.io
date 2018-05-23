package main

import (
	"fmt"
	"go_ssh/modle"
	"io"
	"log"
	"time"

	"github.com/gliderlabs/ssh"
)

var (
	SSH_Observer *modle.Observer = modle.NewObserver()
)

type PtyInput struct {
	length int
	Cursor int
	Line   *StringLinkd
}

func ClearLine(ses *ssh.Session, linelen int) {
	s := *ses
	io.WriteString(s, fmt.Sprintf("\033[%dD", linelen))
	tmp := ""
	for i := 0; i < linelen; i++ {
		tmp += " "
	}
	io.WriteString(s, tmp)
	io.WriteString(s, fmt.Sprintf("\033[%dD", linelen))
}

// func PrintCoding(s ssh.Session, str string) {
// 	io.WriteString(s, str)
// }
// mp := mprocess.NewMineProcess("cmd.exe", []string{""})

// //第一种方法
// go mp.StdoutLoop(nil, func(line string) {
// 	io.WriteString(s, fmt.Sprintf("%s\n", line))
// }, nil)

// go mp.StdoutLoop(nil, func(line string) {
// 	io.WriteString(s, fmt.Sprintf("%s\n", line))
// }, mp.Pstderr)

func SSH_Handle() {
	ssh.Handle(func(s ssh.Session) {

		input := new(PtyInput)
		input.length = 0
		input.Cursor = 0
		input.Line = NewStringLinkd(1024)

		io.WriteString(s, fmt.Sprintf("Welcome %s ,请输入你的密码: ", s.User()))
		go (func() {
			for {
				ClearLine(&s, input.Line.Len)
				io.WriteString(s, fmt.Sprintf("NOW: %s\n", time.Now()))
				// io.WriteString(s, fmt.Sprintf("\033[%dD", len(CommandLine)))
				io.WriteString(s, input.Line.toString())
				io.WriteString(s, fmt.Sprintf("\033[%dD", input.length-input.Cursor))
				time.Sleep(time.Second * 3)
			}
		})()

		ch := make([]byte, 1)
		for {
			i, err := s.Read(ch)
			if err != nil || i <= 0 {
				fmt.Println("Mineself Err: Console is end of file")
				break
			}
			if ch[0] == 27 || ch[0] == 91 {
				continue
			}
			if ch[0] == 65 { //up
				fmt.Print("↑")
				io.WriteString(s, fmt.Sprintf("\033[1B"))
				continue
			}
			if ch[0] == 66 { //down
				fmt.Print("↓")
				continue
			}
			if ch[0] == 67 { //r
				fmt.Print("→ ")
				if input.Cursor >= input.length {
					input.Cursor = input.length - 1
				} else {
					io.WriteString(s, "\033[1C")
				}
				input.Cursor += 1
				continue
			}
			if ch[0] == 68 { //l
				fmt.Print("← ")
				io.WriteString(s, "\033[1D")
				if input.Cursor > 0 {
					input.Cursor -= 1
				}
				continue
			}
			//删除还未完成
			if ch[0] == 8 {
				if input.Cursor <= 0 || input.length <= 0 {
					continue
				}
				io.WriteString(s, fmt.Sprintf("\033[%dD", input.Line.Len))

				fmt.Println("删除:  偏移值:", input.Cursor, "总长度:", input.length)
				if input.Cursor >= input.length {
					// fmt.Println("末尾删除,操作前值", CommandLine[:])
					input.Line.delete(input.Line.Len)
					// fmt.Println("末尾删除,操作后值", CommandLine[:])
				} else {
					// fmt.Println("中间部分删除", input.Cursor, "~", input.Cursor+1)
					// fmt.Println("操作前只：", CommandLine)
					// CommandLine = CommandLine[:input.Cursor-1] + CommandLine[input.Cursor:]
					input.Line.delete(input.Cursor)
					// fmt.Println("操作后值：", CommandLine)
				}

				input.Cursor -= 1
				input.length = input.Line.Len

				//空格是覆盖掉多余的那个字符
				input.Line.insert(input.Line.Len, 32)
				io.WriteString(s, input.Line.toString())
				io.WriteString(s, fmt.Sprintf("\033[%dD", input.length-input.Cursor+1))
				continue
			}

			if ch[0] < 32 && ch[0] != 13 {
				fmt.Println("不明字符:", ch[0])
				continue
			}

			//正常字符处理
			fmt.Print("键入的值是:", ch[0], "当前字符串长度是:", input.Line.Len, " | ")

			ClearLine(&s, input.Line.Len)

			if input.Cursor >= input.length {
				input.Line.insert(input.Line.Len, int32(ch[0]))
			} else {
				// CommandLine = CommandLine[:input.Cursor] + tmpby + CommandLine[input.Cursor:]
				input.Line.insert(input.Cursor, int32(ch[0]))
			}
			input.length = input.Line.Len + 1
			input.Cursor += 1
			fmt.Println("输:", input.length, "向左偏移:", input.Cursor)

			io.WriteString(s, input.Line.toString())
			io.WriteString(s, fmt.Sprintf("\033[%dD", input.length-input.Cursor))

			// SSH_Observer.Emit("coding", &modle.SessionData{&s, &line})

			if ch[0] == 13 {
				input.Cursor = 0
				input.length = 0
				// SSH_Observer.Emit("exec_commad", &modle.SessionData{&s, CommandLine})
				fmt.Println("执行命令: ", input.Line.toString())
				io.WriteString(s, input.Line.toString())
				input.Line.clear()

			}

		}
	})

}

func main() {
	SSH_Listener()
	SSH_Handle()
	log.Println("starting ssh server on port 2222...")
	log.Fatal(ssh.ListenAndServe(":2222", nil))

}

func run() {

}
