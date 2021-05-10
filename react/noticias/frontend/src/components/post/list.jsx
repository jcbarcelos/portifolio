import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectTab, showTabs } from '../../common/tab/tabActions'
import { getPost, showUpdate, showDelete } from './postActions'

class List extends Component {

    componentWillMount() {
        this.props.getPost()
    }
    dateFormat(date) {
        const format = new Date(date)
        return `${format.toLocaleDateString()} ${format.toLocaleTimeString()}`
    }
    RenderValue() {
        return this.props.noticias.map(vl => (
            <tr key={vl._id}>
                <td>{vl.title}</td>
                <td>{vl.description}</td>
                <td>{this.dateFormat(vl.date)}</td>
                <td className="col-2">
                    <div className="d-grid gap-3 d-md-block">
                        <button className="btn btn-warning botao" onClick={() => this.props.showUpdate(vl)}>
                            <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => this.props.showDelete(vl)}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </td>
            </tr>

        ))
    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data</th>
                        <th scope="col">Açoes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.RenderValue()}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({ noticias: state.postReducer.noticias })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getPost, showUpdate, selectTab, showTabs, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(List)