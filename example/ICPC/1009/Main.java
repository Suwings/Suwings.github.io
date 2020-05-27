package com.company;


import java.lang.reflect.Array;
import java.util.Scanner;

class Node {   

    public Node[] sub = new Node[26];
    public char ch = 0;
    public boolean isWord = false;
    public int cnt = 1;  //find count

    public Node() {
        for (int i = 0; i < sub.length; i++) {
            sub[i] = null;
        }
    }

    public static void add(Node top, String str) {
        if(str.equals(""))return;
        char[] chs = str.toCharArray();
        for (char ch : chs) {
            int pos = ch - 'a';
            if (top.sub[pos] == null) {
                Node node = new Node();
                node.ch = (char) (pos + 'a');
                top.sub[pos] = node;
            }else {
                top.sub[pos].cnt++;
            }
            top = top.sub[pos];//Next
        }

        //这里是最后的 node
        top.isWord = true;
    }

    public static int getWord(Node top, String str) {
        char[] chs = str.toCharArray();
        for (char ch : chs) {
            int pos = ch - 'a';
            if (top.sub[pos] != null) {
                top = top.sub[pos];
            }else {
                return 0;
            }
        }      
        return top.cnt;
    }

}

public class Main {

    static Node Tree = new Node();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        String inputStr;
        do {
            inputStr = sc.nextLine();
            Node.add(Tree,inputStr);
        }while (!inputStr.equals(""));

        int [] outQ = new int[6000];
        int len = 0;

        while (sc.hasNext()){
            String findStr = sc.nextLine();
            System.out.println(Node.getWord(Tree,findStr ));
        }

    }
}


