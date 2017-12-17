import React from "react";
import {
    createFragmentContainer,
    graphql
} from "react-relay";

export type ProjectType = {
    repository: {
        name: string,
        url: string,
        stargazers: {
            totalCount: number
        }
    }
}

class Project extends React.Component<ProjectType> {
    render() {
        return (
            <div className="dt w-100 mt1">
                <div className="dtc">
                    <h1 className="f5 f4-ns mv0">
                        <a href={this.props.repository.url}>{this.props.repository.name}</a>
                    </h1>
                </div>
                <div className="dtc tr">
                {this.props.repository.stargazers.totalCount} <i className="fa fa-star" />
                </div>
            </div>
        )
    }
}

export default createFragmentContainer(Project, graphql`
    fragment project_repository on Repository {
        id
        name
        url
        stargazers{
            totalCount
        }
    }
`)