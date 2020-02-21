
class InputController
{

    constructor(actions_to_bind, target)
    {
        this.bindedActions = {};    //создаем объект для сохранения действий 
        this.keys = {};             //создаем объект для хранения ключей (коды клавиш)
        this.enabled = false;       //булева переменная отвечающая за состояние функционала вкл/выкл
        this.bindActions(actions_to_bind); // ф-я получающая данные для обработки
        this.attach(target);        // ф-я получающая DOM элемент
    }

    bindActions(actions_to_bind)
    {
        if(!actions_to_bind) return false;  // если данных нет то возвращает ложь

        for( var newActionName in actions_to_bind) // для каждого действия из списка действий :
        {
            let newAction = actions_to_bind[newActionName];//присваиваем временной переменной какое-либо содержимое объекта
            
            // Action
            let action = this.bindedActions[newActionName];  //присваиваем временной переменной объект действия который будет хранить в себе действие из списка
            if( !action ) action = this.bindedActions[newActionName] = {}; // если действие не создано(некорректно) то обнуляем созданную переменную 
            action.enabled = newAction.enabled; // добавляем временному объекту состояние "включено"
            action.keys = newAction.keys; // добавляем временному объекту коды клавиш(действий)
            action.isActive = false; // добавляем временному объекту свойство свойство "не активно"
            
            // Keys
            action.keys.forEach((keyCode)=>{
                let key = this.keys[keyCode];
                if(!key) key = this.keys[keyCode] = {
                    isPressed: false,
                    actions: {}
                };
                key.actions[newActionName] = action;
            });

        }
        console.log("bindedActions",this.bindedActions);
        console.log("keys",this.keys);
        return true;
    }

    enableAction(actions_name)
    {
        if(this.isActionActive(actions_name))
        {
            return true;
        }
        return false;
    }

    disableAction(action_name)
    {
        if(this.isActionActive(action_name))
        {
            for(let i = 0; i < this.actions_to_bind.length; i++)
            {
                if(this.actions_to_bind[i].action_name == action_name)
                {
                    this.actions_to_bind[i].enabled = false;
                }
            }
        }
    }

    attach( target, dont_enable = false)
    {
        if( !target ) return false;
        if( this.target ) this.detach();
        this.target = target;

        this.target.addEventListener("keydown",(e)=>{
            // console.log("keydown",e.keyCode);
            this._setKeyValue(e.keyCode,true);

        });
        this.target.addEventListener("keyup",(e)=>{
            // console.log("keyup",e.keyCode);
            this._setKeyValue(e.keyCode,false);
        });
    }

    _setKeyValue(keyCode, value){
        var key = this.keys[keyCode];
        if( !key ) key = this.keys[keyCode] = {};
        key.isPressed = value;
        for( var actionName in key.actions ){
        key.actions[actionName].isActive = value;
        }
    }

    detach()  
    {
        if(!this.target) return false;
        this.target = null;
    }

    isActionActive(actionName)
    {
        var action = this.bindedActions[actionName];
        if(!action) return false;
        return action.isActive;
    }

    isKeyPressed(keyCode)
    {
        return this.keys[keyCode].isPressed;
    }

}

export default InputController;