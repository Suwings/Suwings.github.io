package top.suiwngs.B;

import java.util.Arrays;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()){
        String line = sc.nextLine();
        String[] strs = line.split("5");
        long[] longs = new long[2000];
        int len = strs.length;
        for (int i = 0; i < strs.length; i++) {
            try {
                longs[i]=Long.parseLong(strs[i]);
            }catch (Exception err){
                len--;
            }

        }
        Arrays.sort(longs);
        for (int i = longs.length - len; i <  longs.length ; i++) {
            if(i +1 ==longs.length){
                System.out.println(longs[i]);
                continue;
            }
            System.out.print(longs[i]+" ");
        }
        }
    }
}
