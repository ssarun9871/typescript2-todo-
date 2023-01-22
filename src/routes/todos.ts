import {Router} from 'express';
import {Todo} from '../models/todo';
type RequestBody = {text:string};
type RequestParams = {todoId:String};

let todos:Todo[]= [];
const router = Router();

router.get('/',(req,res,next)=>{
 res.status(200).json({todos:todos});
});

router.post('/todo',(req,res,next)=>{
    const body = req.body as RequestBody;
    const newTodo:Todo={
        id: new Date().toISOString(),
        text:body.text,
    };

    todos.push(newTodo);
    res.status(201).json({message:'Added Todo',todo:newTodo,todos:todos})
    res.send('success')
})

router.put('/todo/:todoId',(req,res,next)=>{
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoItem=>todoItem.id === tid);
    if(todoIndex>=0){
       todos[todoIndex]={id:todos[todoIndex].id,text:req.body.text};
       return res.status(200).json({message:'Updated todo',todos:todos});
    }
    res.status(404).send('Item not found.');
})

router.delete('/todo/:todoId',(req,res,next)=>{
  const params = req.params as RequestParams;
  todos = todos.filter(todoItem=> todoItem.id!==params.todoId);
  res.status(200).json({messge:'Deleted todo', todos:todos});
})
export default router;
