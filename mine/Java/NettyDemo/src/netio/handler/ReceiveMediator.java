package top.suiwngs.netio.handler;

import top.suiwngs.netio.entiy.MinePackage;
import top.suiwngs.netio.entiy.ResponseContext;

import java.util.Hashtable;
import java.util.Map;

final public class ReceiveMediator {

    //only one
    private volatile static ReceiveMediator receiveMediator = new ReceiveMediator();
    private volatile static Map<String,ReceiveEventInterface> mineMap = new Hashtable<>();

    private ReceiveMediator(){

    }

    public static ReceiveMediator getInstance() {
        return receiveMediator;
    }

    public synchronized void onRouter(String eventName,ReceiveEventInterface rec){
        mineMap.put(eventName,rec);
    }

    public synchronized void fireRouter(String eventName, ResponseContext ctx){
        ReceiveEventInterface receiveEventInterface = mineMap.get(eventName);
        if(receiveEventInterface!=null){
            receiveEventInterface.exec(ctx);
        }
    }

}
