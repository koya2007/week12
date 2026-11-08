'use client'
import { useEffect, useState } from "react";
import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Button } from "@/components/tailgrids/core/button";
import { Plus } from "@tailgrids/icons";
import { Badge } from "@/components/tailgrids/core/badge";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ClockThree, Trash1 } from "@tailgrids/icons";
import { Spinner } from "@/components/tailgrids/core/spinner";

import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";


export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([])
  const [todos, setTodos] = useState<TodoType[]>([])
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false)
  const [itemsPerPage, setItemsPetPage] = useState<number>(5)

  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [showDialog, setShowDialog] = useState<boolean>(false)

useEffect(() => {
  const _todoRawStr = localStorage.getItem('todosRaw')

  if (_todoRawStr === null) {
    setTodosRaw([])
  } else {
    setTodosRaw(JSON.parse(_todoRawStr))
  }

  setIsLoading(false)
}, [])
useEffect(() => {
  if (isLoading) return

  localStorage.setItem(
    'todosRaw',
    JSON.stringify(todosRaw)
  )
}, [todosRaw, isLoading])
  //onload
  // useEffect(() => {
  //   fetchTodos()
  //     .then((data) =>
  //       setTodosRaw(data as TodoType[])
  //     )
  //     .catch((error) =>
  //       setTodosRaw([])
  //     )
  //     .finally(() =>
  //       setIsLoading(false))
  // }, [])

  //todoRaw ,onlyWaiting => [] => todos
  useEffect(() => {
    console.log(onlyWaiting)
    // console.log(todosRaw)

    onlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw)
  }, [todosRaw, onlyWaiting])

  //todos, itemsPerPage => [] => totalPages
  useEffect(() => {
    console.log(itemsPerPage)
    setTotalPages(Math.ceil(todos.length / itemsPerPage))
  }, [todos, itemsPerPage])

  //totalpages => [] currentPage

  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage <= 0) setCurrentPage(1)
      else if (currentPage > totalPages) setCurrentPage(totalPages)
    }
  }, [totalPages])

  //delete
  const deletedTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) =>
      todo.id !== id))
  }

  //make Done
  const makeDone = (id: number) => {
    // console.log(`make To done...(${id})`)
    //[{1},{2},{3}]
    ///pointer selected

    const selected = todosRaw.find((todo) => {
      return todo.id === id
    })

    //edit
    selected!.completed = true
    console.log(selected)

    //update state
    setTodosRaw([...todosRaw])
  }

// add new Todo
const addTodo = () => {
  console.log('add.todo...')

  const idDom = document.getElementById('id') as HTMLInputElement
  const titleDom = document.getElementById('title') as HTMLInputElement

  // validate
  const titleStr = titleDom.value.trim()

  if (titleStr === '') return

  const newTodo: TodoType = {
    userId: 1,
    id: Number(idDom.value),
    title: titleStr,
    completed: false
  }
//add to todoRaw
  setTodosRaw([...todosRaw, newTodo])
}



  return (
    <>


     {/* todos container */}

      <div className='mt-4 px-2 max-w-3xl mx-auto'>

        {/* controller */}
        <div className='flex justify-between '>

          {/*toggle */}
          <div className='flex gap-2 items-center'>
            <Toggle label="Show only" checked={onlyWaiting}
              onChange={(e) => setOnlyWaiting(e.target.checked)
              } />
            &nbsp;
            <Button
              size="sm"
              className='h-8 p-2 bg-yellow-500 pointer-events-none'>
              Waiting
              <ClockThree />
            </Button>
          </div>

          {/*dropdown */}
          <div className='w-1/3'>
            <NativeSelect value={itemsPerPage} onChange={(e) =>
              setItemsPetPage(Number(e.target.value))}>
              <NativeSelectOption value="5">5 items per page</NativeSelectOption>
              <NativeSelectOption value="10">10 items per page</NativeSelectOption>
              <NativeSelectOption value="50">50 items per page</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        {/* table */}
        <div className='mt-3'>
          <TableRoot>
            <TableHeader>

              <TableRow className='bg-black text-white'>
                <TableHead className="w-24 font-bold text-right">ID</TableHead>
                <TableHead className='font-bold text-center'>Title</TableHead>
                <TableHead className="font-bold">
                  <div className="flex items-center justify-end gap-2">
                    <span>Completed</span>

                    <Button
                      variant="primary"
                      onClick={() => setShowDialog(true)}
                      className="h-8 p-2"
                    >
                      <Plus />
                  </Button>
                  </div>
                </TableHead>
              </TableRow>

            </TableHeader>
            <TableBody>
              {/* show spinner while loading */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}

              {
                !isLoading && todos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className='text-center text-red-500'>
                      No data, may br connection refused (refused again)
                    </TableCell>
                  </TableRow>
                )
              }
              {/* render data */}
              {todos
                .filter((todo, index) => {
                  const lower = (currentPage - 1) * itemsPerPage
                  const upper = currentPage * itemsPerPage - 1

                  return index >= lower && index <= upper
                })
                .map((todo) => {

                  ///handle functions


                  return (
                    <TableRow key={todo.id}>

                      <TableCell className="text-right">
                        <Badge
                          size="lg"
                          className="rounded-lg bg-gray-500 text-white font-bold"
                        >
                          {todo.id}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {todo.title}
                      </TableCell>

                    <TableCell>
  <div className="flex items-center justify-end gap-1">

    {todo.completed ? (
      <>
        <Button
          size="sm"
          className="h-7 px-2 text-xs bg-green-500 text-white pointer-events-none"
        >
          done ✓
        </Button>

        <Button
          variant="danger"
          onClick={() => deletedTodo(todo.id)}
          className="h-7 w-7 p-0"
        >
          <Trash1 className="size-4" />
        </Button>
      </>
    ) : (
      <>
        <Button
          size="sm"
          onClick={() => makeDone(todo.id)}
          className="h-7 px-2 text-xs bg-yellow-500"
        >
          waiting
          <ClockThree className="size-4" />
        </Button>

        <Button
          variant="danger"
          onClick={() => deletedTodo(todo.id)}
          className="h-7 w-7 p-0"
        >
          <Trash1 className="size-4" />
        </Button>
      </>
    )}

  </div>
</TableCell>

                    </TableRow>
                  )
                })}

              {/* completed = false */}
              {/* <TableRow>
            <TableCell className='text-right'>
              <Badge
                size={'lg'}
                className='rounded-lg bg-gray-500 text-white font-bold'>1</Badge>
            </TableCell>

            <TableCell>
              CSi202
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                className='h-8  w-24 p-2 bg-green-500  text-white pointer-events-none'>
                Done
              </Button>
            </TableCell>
          </TableRow> */}


              {/* completed = true */}
              {/* <TableRow>
              <TableCell className='text-right'>
                <Badge
                  size={'lg'}
                  className='rounded-lg bg-gray-500 text-white font-bold'>2</Badge>
              </TableCell>

              <TableCell>
                Csi 205
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-2">
                  <Button
                    size="sm"
                    className='h-8 p-2 bg-yellow-500 pointer-events-none'>
                    Waiting
                    <ClockThree />
                  </Button>
                  <Button variant='danger' className='h-8 p-0'>
                    <Trash1 />
                  </Button>
                </div>
              </TableCell>
            </TableRow> */}

            </TableBody>
          </TableRoot>

        </div>

        {/* pagination */}
        {todos.length > 0 && (
          <div className='mt-3 w-2/3 mx-auto flex justify-center items-center gap-3'>
            <Button size="sm" appearance='outline' onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1} className='mr-3'>First</Button>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              sideLayout='full'


            />
            <Button size="sm" appearance='outline' onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages} className='ml-4'>Last</Button>
          </div>
        )}
      </div >

      <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2text-2xl">
              <Plus className="bg-blue-100 rounded-md size={32}" />
              New Todo</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID(Auto)</Label>
                <Input
                id='id'
                  className="w-full pointer-events-none bg-gray-100
                  text-gray-400"
                  value={todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0)+1}

                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">title</Label>
                <Input
                  autoFocus
                  placeholder="Enter your Title"
                  className="w-full"
                  id='title'

                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline">
              Cancel
              </DialogClose>
            <DialogClose onClick={()=>addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop> </>
  )
}
