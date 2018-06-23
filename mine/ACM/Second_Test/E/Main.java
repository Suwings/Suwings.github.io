package top.suiwngs.E;


import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    static Scanner sc = new Scanner(System.in);
    static Map<String, Integer> map = new HashMap<>();

    public static void main(String[] args) {

        while (true) {
            int count = sc.nextInt();
            if (count == 0) System.exit(0);
            for (int i = 0; i < count; i++) {
                String name = sc.next();
                map.merge(name, 1, (a, b) -> a + b);
            }
            int max = -1;
            String name = "";
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                if (entry.getValue() > max) {
                    max = entry.getValue();
                    name = entry.getKey();
                }
            }
            System.out.println(name);
            map.clear();
        }
    }
}
