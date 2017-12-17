import React from "react";
import ProjectList from "../components/list";
import {environment} from "../environment";
import {
    QueryRenderer,
    graphql
} from "react-relay";
import { setTimeout } from "timers";

type PropTypes = {}

type StateType = {
    username: string
}

const HomeQuery = graphql`
query homeQuery($username: String!) {
    user(login: $username){
        name
        databaseId
        ...list_user
    }
}`

export default class Home extends React.Component<PropTypes, StateType> {
    debounce: any
    
    constructor(props: PropTypes) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.state = {
            username: "rodrigo-brito"
        }
    }

    onChange(event: any){
        this.setState({username: event.target.value});
    }
    
    render() {
        let result = null;
        if (this.state.username) {
            result = <QueryRenderer
                environment={environment}
                query={HomeQuery}
                variables={{"username": this.state.username}}
                render={({error, props}: any): any => {
                    if (error) {
                        return <div>{error.message}</div>
                    } else if (props) {
                        console.log(props)
                        return <ProjectList user={props.user} />
                    }
                    return <div>Loading</div>
                }}
            />;
        }
        return (
            <div className="pa3 pa5-ns">
                <h1 className="f1">Lista de projetos</h1>
                <div className="measure">
                    <label htmlFor="name" className="f6 b db mb2">Username <span className="normal black-60">(GitHub login)</span></label>
                    <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" name="username" onChange={this.onChange}
                        value={this.state.username} />
                </div>
                {result}
            </div>
        )
    }
}