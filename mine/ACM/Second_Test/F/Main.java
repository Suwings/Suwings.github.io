package top.suiwngs.F;

import java.util.Scanner;

class Node {
    Node left;
    Node right;
    int date;
    int s;
    int e;

    Node(int d, Node l, Node r, int s, int e) {
        date = d;
        left = l;
        right = r;
        this.s = s;
        this.e = e;
    }
}

public class Main {


    static int n;
    static Node head;
    static Scanner scanner = new Scanner(System.in);


    public static void main(String[] args) {
        while (true) {
            n = scanner.nextInt();

            if (n == 0) System.exit(0);

            // 初始化
            Node l = createTree(1, (1 + n) / 2);
            Node r = createTree((1 + n) / 2 + 1, n);
            head = new Node(0, l, r, 1, n);
            for (int i = 0; i < n; i++) {
                int a = scanner.nextInt();
                int b = scanner.nextInt();
                update(head, a, b);
            }
            scan(head, 0);
            System.out.println();
        }
    }

    // 搜索
    private static void scan(Node head2, int k) {
        head2.date += k;
        if (head2.left == null && head2.right == null) {
            System.out.print(head2.s == 1 ? head2.date : " " + head2.date);
        } else {
            scan(head2.left, head2.date);
            scan(head2.right, head2.date);
        }
    }

    // 区块更新
    private static void update(Node head2, int a, int b) {
        if (head2.s >= a && head2.e <= b) {
            head2.date += 1;
        } else if (head2.s > b || head2.e < a) {

        } else {
            update(head2.left, a, b);
            update(head2.right, a, b);
        }
    }

    // 创建树
    private static Node createTree(int s, int e) {
        if (s > e) return null;
        if (s == e) return new Node(0, null, null, s, e);
        Node l = createTree(s, (s + e) / 2);
        Node r = createTree((s + e) / 2 + 1, e);
        return new Node(0, l, r, s, e);
    }


}

