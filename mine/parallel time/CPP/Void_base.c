#include <stdio.h>
#include <stdlib.h>


#define SIEZ_NAME 200
#define Class struct 

//双向链表
typedef Class Struct_List_Node{
    void * item;
    struct Struct_List_Node * next;
    struct Struct_List_Node * previous;
}WList_Node;

typedef Class Struct_WList{
    //类的属性
    WList_Node* head;
    WList_Node* end;
    int length; 

    //公开方法函数
    void (*push)(Class Struct_WList*,void*);
    void (*destroy)(Class Struct_WList* );
    void* (*pop)(Class Struct_WList* );
    void* (*shift)(Class Struct_WList* );

}WList;


void WList_push(WList* self,void* item){
    WList_Node* new_node = (WList_Node* )malloc(sizeof(WList_Node));
    new_node->item = item;
    new_node->next = NULL;
    new_node->previous = NULL;
    printf("Push %p\n", new_node);
    self->length++;
    if(self->head == NULL){
        self->head = self->end = new_node;
    }else{
        new_node->previous = self->end;
        self->end = self->end->next = new_node;
    }
    
}

void* WList_pop(WList* self){
    if(self->length <= 0 )return NULL;
    WList_Node* pop_node;
    self->length--;
    pop_node = self->end;
    pop_node->previous->next = NULL;
    void* return_p = pop_node->item;
    free(pop_node);
    return return_p;

}

void* WList_shift(WList* self){
    if(self->length <= 0 )return NULL;
    WList_Node* pop_node;
    self->length--;
    pop_node = self->head;
    self->head = self->head->next;
    self->head->previous = NULL;
    void* return_p = pop_node->item;
    free(pop_node);
    return return_p;
}

void WList_destroy(WList* self){
    WList_Node* destroy_node;
    while(self->head){
        destroy_node = self->head;
        self->head = self->head->next;
        printf("WList_destroy: %p\n",destroy_node);
        free(destroy_node);
    }   
}

void WList_init(WList* self){
    self->length = 0;
    self->head = self->end = NULL;
    self->push = WList_push;
    self->pop = WList_pop;
    self->shift = WList_shift;    
    self->destroy = WList_destroy;
}


//测试类型
typedef Class struct_book{
    char name[SIEZ_NAME];
    int price;
}Book;

int main(){
    //测试
    WList* list = (WList*) malloc(sizeof(WList));

    WList_init(list);

    list->push(list,"Head !");//C可以省略强制转换,但不建议
    list->push(list,(void *)'S');
    list->push(list,(void *)66666);
    list->push(list,(void *)2);
    list->push(list,(void *)(char *) malloc(sizeof(char)*10));
    list->push(list,(void *)"wc");
    list->push(list,(void *)(char *) malloc(sizeof(char)*10));
    list->push(list,(void *)(char *) malloc(sizeof(char)*52));
    list->push(list,(void *)(char *) malloc(sizeof(char)*100));
    list->push(list,(void *)(Book *) malloc(sizeof(Book)*10));
    list->push(list,(void *)"HelloWorld!!!!");

    printf("\nFrist List length:%d\n\n", list->length);
    printf("Head String: %s \n\n",(char *) list->shift(list));
    printf("End String: %s \n\n", list->pop(list));
    printf("List length:%d\n", list->length);

    list->destroy(list);

    getchar();
    return 0;
}