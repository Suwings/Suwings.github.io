package com.suwings;


// 测试并且使用
@MyAnnotationDefinition(id = 123, name = "xxx")
public class UseAnnotation {

    @MyAnnotationDefinition(id = 234, name = "M0001")
    private String orderId;

    UseAnnotation() {

    }

    @MyAnnotationDefinition(id = 456, name = "M0002")
    public String use() {
        return "Used";
    }

    @MyAnnotationDefinition(id = 789, name = "M0003")
    public String use2() {
        return "Used";
    }
}
