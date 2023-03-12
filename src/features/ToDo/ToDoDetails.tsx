import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ToDo } from "../../app/models/ToDo";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";



export default observer(function ToDoDetails() {
    const { toDoStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = toDoStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setToDo] = useState<ToDo>({
        id: '',
        title: '',
        status: '',
        tragetDate: null,
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        // category: Yup.string().required('The event category is required'),
        // description: Yup.string().required(),
        // date: Yup.string().required('Date is required').nullable(),
        // venue: Yup.string().required(),
        // city: Yup.string().required(),
    });

    useEffect(() => {
             
        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setToDo(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(todo: ToDo) {
        debugger
        if (todo.id.length === 0) {
            let newToDo = {
                ...todo
            };

            createItem(newToDo).then( (newID) => {
                debugger;
                navigate(`/toDodetails/${newID}`)
            } )
        } else {
            updateItem(todo).then(() => navigate(`/toDodetails/${todo.id}`))
        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/toDolist/'))
    }

    if (toDoStore.loadingInitial) return <LoadingComponent content='Loading To Do details' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={todo}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyDateInput name='tragetDate' placeholderText='Date' peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select"  showTimeSelect={true} timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />

                        {/* <MyTextAreaInput rows={3} name='description' placeholder='Description' />
                        <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
                        <MyDateInput name='date' placeholderText='Date' peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select"  showTimeSelect={true} timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <MyTextInput name='city' placeholder='city' />*/}
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/toDolist' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})