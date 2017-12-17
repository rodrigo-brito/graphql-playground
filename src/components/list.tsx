import React from "react";
import Project, {ProjectType}  from "./project";
import {
    createFragmentContainer,
    graphql
} from "react-relay";

type PropTypes = {
    user: any
}
type StateType = {
    projects: Array<ProjectType>
}

class ProjectList extends React.Component<PropTypes, StateType> {
    getList(): Array<JSX.Element> {
        return this.props.user.repositories.edges.map((edge: any, i: number) => {
            return <Project repository={edge.node} key={i} />
        });
    }
    
    render(){
        if (!this.props.user){
            return <p>Usuário inválido...</p>
        }
        return (
            <div>
                <h1>{this.props.user && this.props.user.name} (Top 10 projects)</h1>
                {this.getList()}
            </div> 
        )
    }
}

export default createFragmentContainer(ProjectList, graphql`
    fragment list_user on User {
        name
        repositories(first: 10, orderBy:{field:STARGAZERS, direction: DESC}) @connection(key: "user_repositories") {
            totalCount
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
                node {
                    ...project_repository
                }
            }            
        }
    }
`)