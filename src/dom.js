window.dom ={
    create(string) { //创建一个节点
        const container = document.createElement
        ("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2){  
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2){
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node){ //增加一个儿子
        parent.appendChild(node);
    },
    wrap(node, parent){ //增加一个父亲
        dom.before(node, parent);
        dom.append(parent,node);
    },
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node){//删除一个节点的所有儿子,因为删除后node.length是变化的所以用while
        const array = [];
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild));
            x =node.firstChild;
        }
        return array;
    },
    attr(node, name, value){ 
        if(arguments.length ===3){ //设置节点属性
        node.setAttribute(name, value);
        }else{//查询节点属性
          return node.getAttribute(name);
        }
    },

    text(node,string){
        if(arguments.length ===2){
            node.innerText=string; 
        }else if(arguments.length ===1){
            return node.innerText;
        }  
    },

    html(node,string){
        if(arguments.length ===2){
            node.innerHTML=string;
        }else if(arguments.length ===1){
            return node.innerHTML;
        }  
    },
    style(node, name, value){
        if(arguments.length ===3){
            //dom.style(div, 'color','red')
            node.style[name]=value;
        }else if(arguments.length ===2){
            //dom.style(div, 'color')
            if(typeof name ==='string'){
                return node.style[name]
            }else if( name instanceof Object){
                const object =name;
                for(let key in object){
                    node.style[key]=object[key]  
                  } 
            } 
        } 
    },

    class: { 
        add(node,className){
        node.classList.add(className);
    },
    remove(node, className){
    node.classList.remove(className)
  },
    has(node, className){
       return node.classList.contains(className);
    }
},
    on(node,eventName,fn){//添加一个点击事件
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){//移除一个点击事件
        node.removeEventListener(eventName,fn);
    },
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
      },
      parent(node){
          return node.parentNode;
      },
      children(node){
          return node.children;
      },
      siblings(node){ //获得节点的兄弟元素
         return Array.from(node.parentNode.children).filter(n =>n!=node)
      },
      next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
          x = x.nextSibling
        }
        return x
      },
        previous(node){
            x=node.previousSibling
            while(x && x.nodeType===3){
                x = x.previousSibling
            }
            return x;
        },
        each(nodeList,fn){
            for(let i=0;i<nodeList.length;i++){
                fn.call(null,nodeList[i])
            }
        },
        index(node){
            const list = dom.children(node.parentNode)
            let i
            for( i=0;i<list.length;i++){
                if(list[i]===node){
                    break;
                }
            }
            return i;
        }
}