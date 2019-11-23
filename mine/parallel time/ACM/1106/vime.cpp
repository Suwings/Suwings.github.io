//于 2017 年 11月8日 完成， 嘟嘟熊的0与1的世界 ACM 算法题目

#include <stdio.h>
#include <stdlib.h>
#include <string.h>


const int MAX = 156;
char MAP[MAX][MAX];
int X_LEN = 1;
int Y_LEN = 1;
int Y_G = 1;
int X_G = 1;


#define MAP_DOU_FOR for(int X=X_G;X<X_LEN;X++){for(int Y=Y_G;Y<Y_LEN;Y++){
#define MAP_DOU_FOR_END }}

#define DEBUG 0

//debug
int debug(){
    if(DEBUG){
        printf("---------------DEBUG------------------\n");
        for(int X=0;X<X_LEN+1;X++){
            for(int Y=0;Y<Y_LEN+1;Y++){
                printf("%c",(int)MAP[X][Y]); 
            }
            printf("\n"); 
        }
    } 
}

int butter(int x,int y,int ch,int ch_to){
    if(x>X_LEN+1 || y >Y_LEN+1 || y<Y_G-1||x<X_G-1)return -1;
    if(MAP[x][y] != ch ) return 0;
    if(MAP[x][y] == ch) MAP[x][y] = ch_to;
    //  printf("[%d %d %d] => ",x,y,MAP[x][y]);
    x--;
    butter(x,y,ch,ch_to);x++;
    y++;
    butter(x,y,ch,ch_to); y--;
    y--;
    butter(x,y,ch,ch_to); y++;
    x++;
    butter(x,y,ch,ch_to);x--;
    return 0;
}


// char flag = 'A';
// int isBlcokHow(char ch){
//     int count = 0;
//     for(int X=X_G;X<X_LEN;X++){
//         for(int Y=Y_G;Y<Y_LEN;Y++){
//             if(MAP[X][Y] == ch){
//                 butter(X,Y,ch,flag);
//                 flag++;
//                 count++;
//             }
                
//         }
//     }
//     return count;
    
// }


int main(){
    int line,wigth;
    char str[MAX];
    // printf("------------");
    // for(int x=0;x<MAX;x++){for(int xy=0;xy<MAX;xy++) printf("%d",MAP[x][xy]);printf("\n");};
    // printf("------------");
    while(~scanf("%d %d",&line,&wigth)){

        memset(MAP,'0',sizeof(MAP));

        for(int i = 0; i < line; i++) {
            scanf("%s",str);
            for(int j = 0; j < wigth ; j++) MAP[i+1][j+1] = str[j];
        };



        X_LEN = line +1;
        Y_LEN = wigth +1;
        // debug();
        //step 1
        butter(0,0,'0','#');
        // butter(X_LEN-1,Y_LEN-1,'0','#');
        // for(int l=0;l<Y_LEN;l++)if(MAP[0][l] == '0')butter(0,l,'0','#');
        // for(int l=0;l<X_LEN;l++)if(MAP[l][0] == '0')butter(l,0,'0','#');
        // for(int x=0;x<Y_LEN;x++)if(MAP[x][Y_LEN-1] == '0')butter(x,Y_LEN-1,'0','#');
        // for(int y=0;y<19;y++){if(MAP[X_LEN-1][y] == '0')butter(X_LEN-1,y,'0','#');
        // printf("[%d,%d,%c]",X_LEN-1,y,MAP[X_LEN-1][y]);}

        // printf("[%c]",MAP[9][14]);
        // debug();

       
        int count=0;
        char flag = 'A';
        char ch = '1';

        for(int X=X_G;X<X_LEN;X++){
            for(int Y=Y_G;Y<Y_LEN;Y++){
                if(MAP[X][Y] == ch){
                    butter(X,Y,ch,flag);
                    flag++;
                    count++;
                }
                    
            }
        }
        int res1 = count;
        //================
        count = 0;
        flag = '5';
        ch = '0';
        //=============
       
        for(int X=X_G;X<X_LEN;X++){
            for(int Y=Y_G;Y<Y_LEN;Y++){
                if(MAP[X][Y] == ch){
                    butter(X,Y,ch,flag);
                    flag++;
                    count++;
                }
                    
            }
        }
        int res2 = count;

        // printf("\n\n 129 - [%d,%d]\n",res1,res2);

        debug();

        if(res1 == 1 && res2 == 0){
            puts("1");
            continue;
        }else if(res1 == 1 && res2 == 1){
            puts("0");
            continue;
        }else{
            puts("-1");
        }
        
    }
  
    return 0;
}



