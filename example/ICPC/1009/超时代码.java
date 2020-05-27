package com.company;


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static List<Integer> outQueue = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    private static String g_STRING = "";

    public static void main(String[] args) {

        String tmp;
        do {
            tmp = sc.nextLine();
            g_STRING = g_STRING + "___" + tmp;
        } while (!tmp.equals(""));

        String findStr;
        int i = 0;
        while (sc.hasNext()) {
            findStr = sc.nextLine();
            int findCount = 0;
            int loc = 0;
            int x = 0;
            findStr = "___" + findStr;
            int FindAllLoac = 0;
            int tmpLoc = 0;
            while (true) {
                tmpLoc = loc;
                loc = (g_STRING.indexOf(findStr, loc));
                if (loc == -1) {
                    break;
                }
                loc += findStr.length() - 1;

                if (FindAllLoac >= g_STRING.length() - findStr.length() - 1 || tmpLoc > loc) {
                    break;
                }
                findCount++;
            }
            outQueue.add(i, findCount);
            i++;
        }

        for (int x : outQueue) {
            System.out.println(x);
        }
    }
}


