package com.company;


import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()){
            int a = sc.nextInt();
            int b = sc.nextInt();

            System.out.println(Integer.toString(a,b).toUpperCase());
        }

    }



}

//===================================================
package com.company;


import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static Map<String, Boolean> map = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            int all = 0;
            String str = sc.nextLine().trim().replaceAll("  "," ");
            if (str.trim().equalsIgnoreCase("#")) System.exit(0);
            String[] arr = str.split(" ");
            for (String s : arr) {
                if(s.equalsIgnoreCase(""))continue;
                if(s.equalsIgnoreCase("#")){
                    System.out.println(map.size());
                    System.exit(0);
                }
                map.put(s, true);
            }

            System.out.println(map.size());

            map.clear();
        }

    }


}

//================================================
package com.company;


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Node {

    public int x = 0;
    public int y = 0;

    Node(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

public class Main {

    static List<Node> list = new ArrayList<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            int x = sc.nextInt();
            int y = sc.nextInt();
            if (x == 0 && y == 0) {
                doing();
                list.clear();
            } else {
                list.add(new Node(x, y));
            }
        }

    }

    public static void doing() {
        int MAX_x = -1;
        int MIN_x = 9999;
        int MAX_y = -1;
        int MIN_y = 9999;
        if(list.size()<=0)return;;
        for (Node node : list) {
            if (node.x > MAX_x) MAX_x = node.x;
            if (node.y > MAX_y) MAX_y = node.y;
            if (node.x < MIN_x) MIN_x = node.x;
            if (node.x < MIN_y) MIN_y = node.y;
        }

        System.out.println(MIN_x + " " + MIN_y + " " + MAX_x + " " + MAX_y + " " );

    }


}

//===================================================
package com.company;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class Main {

    static List<String> list = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (sc.hasNext()) {
            int count = Integer.parseInt(sc.nextLine());
            for (int i = 0; i < count; i++) {
                list.add(sc.nextLine());
            }
            int oA=0;
            int oE=0;int oI=0;int oO=0; int  oU=0;
            for (String s : list) {
                oA= findWord(s,'a');
                oE= findWord(s,'e');
                oI= findWord(s,'i');
                oO= findWord(s,'o');
                oU= findWord(s,'u');
                System.out.println("a:"+oA);
                System.out.println("e:"+oE);
                System.out.println("i:"+oI);
                System.out.println("o:"+oO);
                System.out.println("u:"+oU);
                System.out.println("");

            }
            list.clear();
        }
    }
    public static int findWord(String str, char ch) {
        int count = 0;
        for(char c:str.toCharArray()){
            if(c == ch)count++;
        }
        return count;
    }


}

//===================================================
package com.company;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    static List<BigInteger> list = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (sc.hasNext()) {
            String line = sc.nextLine();
            int count = (reserver(line, 0));
            System.out.println(count);
            for (int i = 0; i <= count; i++) {
                String out = "";
                out+=(list.get(i));
                if (i  != count) {
                    out+=("--->");
                }
                System.out.print(out);
            }
            System.out.print("\n");
            list.clear();
        }
    }


    public static int reserver(String str, int count) {
        StringBuilder s1 = new StringBuilder(str);
        StringBuilder s2 = new StringBuilder(s1).reverse();

        list.add(new BigInteger(str));
        if (s1.toString().equals(s2.toString())) {
            //hui wen

            return count;
        } else {

            BigInteger m1 = new BigInteger(s1.toString());
            BigInteger m2 = new BigInteger(s2.toString());
            BigInteger r = m1.add(m2);


            return reserver(r.toString(), ++count);
        }

    }


}















