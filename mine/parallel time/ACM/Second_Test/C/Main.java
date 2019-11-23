package top.suiwngs.C;


import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static BigInteger getNFactorial1(int n) {

        BigInteger sum = new BigInteger("1");
        for (int i = 1; i <= n; i++) {
            sum = sum.multiply(new BigInteger(i+""));
        }
        return sum;
    }

    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (sc.hasNext()){
            int n = sc.nextInt();
            if(n==0){
                System.out.println(1);
                continue;
            }
            BigInteger res = getNFactorial1(n);
            System.out.println(res.toString());
        }
    }
}
