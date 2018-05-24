package com.company;

import java.util.Scanner;

import static java.lang.Math.abs;

public class Main {

    public static char[][] MAP = null;
    public static char[][] OJMAP = null;
    public static int[] S_XYZ = new int[2];
    public static int[] D_XYZ = new int[2];

    public static int setpBolck = 0; //steped path
    public static int allBolck = 0;
    public static int canRunBolck = 0;
    public static int cannotRunNolck = 0;
    public static int gT = 0;
    private static int gH;
    private static int gW;
    private static boolean JI_flag = true;


    public static boolean butter(int x, int y, int step) {
        if (x >= gH || y >= gW || y < 0 || x < 0 || step < 0) return false;

//        System.out.println("["+x+","+y+", STEP"+step+"] = "+MAP[x][y]);
        if (MAP[x][y] == 'X' || MAP[x][y] == 0 || (step != gT && MAP[x][y] == 'S')) return false;
        if (MAP[x][y] == 'D' && step == 0) return true;
        if (MAP[x][y] == 'D' && step != 0) return false;

        if (MAP[x][y] == '#') return false;

//        setpBolck++;
//        if (canRunBolck - setpBolck < step) {
//            return false;
//        }

//        int toLen = step - (abs(x - D_XYZ[0]) + abs(y - D_XYZ[1]));
//        if (toLen > gT || (toLen < 0)) {
//            return false;
//        }

        if ((x + y + D_XYZ[0] + D_XYZ[1] + (step)) % 2 == 1) {
            return false;
        }

//        偏移量
//        if (toLen != 0) {
//            if (gT % 2 == 0) {
//                //偶数
//                if (toLen % 2 != 0) {
//                    return false;
//                }
//            } else {
//                //奇数
//                if (toLen % 2 == 0) {
//                    return false;
//                }
//            }
//        }

        //check end

        char backupV;
        backupV = MAP[x][y];
        if (MAP[x][y] == '.') MAP[x][y] = '#';
//
//        try {
//            Thread.sleep(500);
//            debug();
//            System.out.println("Step:" + step);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        int add = 1;
//        if(JI_flag)add = 2;

        if (butter(x + add, y, step - 1)) return true;
        setpBolck--;
        if (butter(x, y + add, step - 1)) return true;
        setpBolck--;
        if (butter(x - add, y, step - 1)) return true;
        setpBolck--;
        if (butter(x, y - add, step - 1)) return true;
        setpBolck--;

        MAP[x][y] = backupV;
        return false;
    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while ((sc.hasNext())) {

            //input
            MAP = new char[7][7];
            OJMAP = new char[7][7];

            String[] tmpStr = sc.nextLine().split(" ");

            int rH = Integer.parseInt(tmpStr[0]);
            int rW = Integer.parseInt(tmpStr[1]);
            int rT = Integer.parseInt(tmpStr[2]);

//
//            int rH = sc.nextInt();
//            int rW = sc.nextInt();
//            int rT = sc.nextInt();

            //exit
            if (rH == 0 && rW == 0 && rT == 0) System.exit(0);
            allBolck = rH * rW;

            gT = rT;
            gH = rH;
            gW = rW;

//            sc.nextLine().toCharArray();
            for (int i = 0; i < rH; i++) {
                MAP[i] = sc.nextLine().toCharArray();
                for (int j = 0; j < rW; j++) {
                    //save start and door.
                    if (MAP[i][j] == 'S') {
                        S_XYZ[0] = i;
                        S_XYZ[1] = j;
                    }
                    if (MAP[i][j] == 'D') {
                        D_XYZ[0] = i;
                        D_XYZ[1] = j;
                    }

                    if (MAP[i][j] == '.') canRunBolck++;// 可以走的地方
                    if (MAP[i][j] == 'X') cannotRunNolck++;
                    OJMAP[i][j] = i % 2 != 0 ?
                            j % 2 == 0 ? (char) 0 : (char) 1 : j % 2 == 1 ? (char) 0 : (char) 1;
                }
            }


            //logic


            //when rect size = Time, become time too long.
            if (canRunBolck + 1 < rT) {
                System.out.println("NO");
                continue;
            }

//            int toLen = (abs(S_XYZ[0] - D_XYZ[0]) + abs(S_XYZ[1] - D_XYZ[1]));
//            if ((toLen % 2) == (rT % 2)) {
//
//
//            }

            if (butter(S_XYZ[0], S_XYZ[1], rT)) {
                System.out.println("YES");
                continue;
            }

            //dfs
//            debug();
            System.out.println("NO");

        }


    }

    //
    public static void debug() {
        System.out.println("----------------------------------");
        for (int i = 0; i < MAP.length; i++) {
            for (int j = 0; j < MAP[i].length; j++) {
                System.out.print(MAP[i][j]);
            }
            System.out.print("\n");
        }
    }
}
