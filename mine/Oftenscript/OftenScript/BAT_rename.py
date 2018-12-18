import os

#允许改名的扩展名
allow_extend_name = ['exe']

w = os.listdir()
z = []
for v in w:
    #改名详细过程
    z.append(v.replace('_','Mcserverw_'))

for i,newname in enumerate(z):
    if len(w[i].split('.')) <= 1:
        #目录
        continue
    extend_name = w[i].split('.')[1]
    for allow_name in allow_extend_name:
        if extend_name == allow_name:
            if not w[i] == newname: 
                try:
                    os.rename(w[i],newname)
                    print("Move: ",w[i],"->",newname)
                except PermissionError as e:
                    print('【PermissionError】 Flie ',w[i],'')
                    continue
                