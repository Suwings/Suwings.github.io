package top.suiwngs.netio.entiy;

public class RoutePackage {

    public String name;
    public String data;
    public int len;

    public RoutePackage(){

    }

    public RoutePackage(String name , String data){
        this.name = name;
        this.data = data;
        this.len = data.length();
    }

}
