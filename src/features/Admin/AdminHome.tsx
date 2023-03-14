import { observer } from 'mobx-react-lite';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import { Button, Card } from "semantic-ui-react";


export default observer(function AdminHome() {
    return (
        <Card.Group>
            <Card>
                <Card.Content>                    
                    <Card.Header>App Config Types</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/AppConfigTypeList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateAppConfigType' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>                    
                    <Card.Header>App Config</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/AppConfigList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateAppConfig' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>                    
                    <Card.Header>Tables</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/TableNameList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateTableName' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>                    
                    <Card.Header>Table Fields</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/TableFieldList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateTableField' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>                    
                    <Card.Header>Data Security</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/DataSecurityList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateDataSecurity' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>                    
                    <Card.Header>User List</Card.Header>                                      
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>                    
                    <Button as={NavLink} to='/UserManagerList' basic color='green' content='List' />
                    <Button as={NavLink} to='/CreateUserManager' basic color='green' content='Add New' />                                                       
                    </div>
                </Card.Content>
            </Card>

        </Card.Group>
    )
})