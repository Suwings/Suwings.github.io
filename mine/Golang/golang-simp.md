Golang 备忘
---------

- Golang 工具安装方法：
https://blog.csdn.net/yo_oygo/article/details/79065966


- Golang 反射
> 可以获得 数据的类型（type）与种类（Kind）
> 可以改变值，判断值是否可修改
> 重点：Value 对象

- Golang 断言
> str := any.(string)
> str,ok := any.(string)


- Golang 反射代码例子
```go
	var i int
	value := reflect.ValueOf(i)

	log.Println(value.Type()) //输出:int
	log.Println(value.Kind()) //输出:int

	s := S{"x"}
	value2 := reflect.ValueOf(s) // 使用ValueOf()获取到结构体的Value对象

	log.Println(value2.Type()) //输出:S
	log.Println(value2.Kind()) //输出:struct

	//value是结构体s,所以打印出来的是整个结构体的信息
	log.Println(value2.Interface()) //输出: {x}

	f0 := value2.FieldByName("A") //获取结构体s中第一个元素a

	log.Println(f0) // 输出: x

	if f0.Kind() == reflect.String {
		if f0.CanSet() {
			f0.SetString("y")
		}
	}

	log.Println(f0) // 输出: y

	log.Println(value.Interface()) //输出: {y}
```