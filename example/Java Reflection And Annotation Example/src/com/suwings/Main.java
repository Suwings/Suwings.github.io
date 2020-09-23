package com.suwings;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Main {

    public static void main(String[] args) throws ClassNotFoundException, InvocationTargetException, IllegalAccessException, NoSuchFieldException {
        // 获取Class
        Class clazz = Class.forName("com.suwings.UseAnnotation");
        // 获取此类的 MyAnnotationDefinition 类型
        MyAnnotationDefinition classAnno = (MyAnnotationDefinition) clazz.getAnnotation(MyAnnotationDefinition.class);
        System.out.println(String.format("ID: %d Name: %s", classAnno.id(), classAnno.name()));
        // 获取所有方法，并试试所有有注解的方法
        Method[] allMethods = clazz.getDeclaredMethods();
        for (int i = 0; i < allMethods.length; i++) {
            if (allMethods[i].isAnnotationPresent(MyAnnotationDefinition.class)) {
                MyAnnotationDefinition methodAnno = allMethods[i].getAnnotation(MyAnnotationDefinition.class);
                System.out.println("遍历:当前方法名为：" + allMethods[i].getName() + " 的注解信息：---" + methodAnno.id() + methodAnno.name() + "\n");
            }
        }
        //获取属性注解信息
        Field nameField = clazz.getDeclaredField("orderId");
        MyAnnotationDefinition attrAnno = nameField.getAnnotation(MyAnnotationDefinition.class);
        System.out.println(attrAnno.name() + "---" + attrAnno.id() + "---" + attrAnno.name());
    }

}
