import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { UserManager } from "../../app/models/UserManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import ValidationError from "../errors/ValidationError";



export default observer(function UserManagerNew() {

    const { userStore } = useStore();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}

            onSubmit={(values, action : any) =>{
                userStore.registerUser(values).then(() => {
                    debugger;
                    action.setSubmitting(false)
                    navigate("/UserManagerList")              
                })
                .catch(error => {
                    action.setSubmitting(false)
                    action.setErrors({ error: error })
                } )}
            }
               
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Add new User' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Display Name" label="Display Name"  name='displayName' />
                    <MyTextInput placeholder="Username" label="Username" name='username' />
                    <MyTextInput placeholder="Email" label="Email" name='email' />
                    <MyTextInput placeholder="Password" label="Password" name='password' type='password' />
                    <ErrorMessage name='error' render={() => 
                        <ValidationError errors={errors.error} />} />
                   

                    <ButtonGroup variant="contained"  aria-label="contained primary button group">
                        <Button
                            disabled={!isValid || !dirty || isSubmitting} 
                            loading={isSubmitting} 
                            positive type='submit' content='Submit'
                        />
                        {/* <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                 */}
                        {/* <Button onClick={handleDelete} content='Delete' floated='right' type='button' /> */}
                        <Button as={Link} to='/UserManagerList' floated='right' type='button' content='Cancel' /> 
                    </ButtonGroup>

                    {isSubmitting?"isSubmitting":"-"}

                </Form> 
            )}

        </Formik>
    )
})
