#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>

#include <pthread.h>

#ifdef INFO
// struct sockaddr_in {
//     sa_family_t    sin_family; /* address family: AF_INET */
//     in_port_t      sin_port;   /* port in network byte order */
//     struct in_addr sin_addr;   /* internet address */
// };

// /* Internet address. */
// struct in_addr {
//     uint32_t       s_addr;     /* address in network byte order */
// };
#endif

int main(void)
{

    int listenfd;
    int addrlen;
    struct sockaddr_in server; //bind server of address
    struct sockaddr_in client; //revc client of ip address

    // bzero(&server, sizeof(server));
    memset(&client, '\0', sizeof(client));
    memset(&server, '\0', sizeof(server));

    if ((listenfd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
    {
        perror("socket() error\n");
        exit(1);
    }

    server.sin_family = AF_INET;
    server.sin_port = htons(8888);
    server.sin_addr.s_addr = inet_addr("0.0.0.0");
    if (bind(listenfd, (struct sockaddr *)&server, sizeof(server)) == -1)
    {
        perror("bind() error\n");
        exit(1);
    }

    /*----------------------listen-------------------*/
    if (listen(listenfd, 5) == -1)
    {
        perror("listen() error\n");
        exit(1);
    }

    addrlen = sizeof(client);
    int connetfd;
    if ((connetfd = accept(listenfd, (struct sockaddr *)&client, &addrlen)) == -1)
    {
        perror("accept() error\n");
        exit(1);
    }

    printf("connect successful!\n");
    // printf("the client ip is %s\n",inet_ntoa(client.sin_addr));

    int serial = 0;
    char rebuf[100];
    int revlen;
    while (1)
    {
        bzero(rebuf, sizeof(rebuf));
        revlen = read(connetfd, rebuf, sizeof(rebuf));
        if ((memcmp("bye", rebuf, 3)) == 0)
        {
            printf("Bye-bye then close the connect...\n");
            break;
        }

        if (revlen <= 0)
        {
            break;
        }

        rebuf[revlen] = '\0';
        printf("[client]:%s", rebuf);
        // printf("Done.");
    }

    close(connetfd);
}
