import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import labelAnInput from '../../common/form/labelAndInput'
import { bindActionCreators } from 'redux'
import { init } from './postActions'
import { selectTab, showTabs } from '../../common/tab/tabActions'

class Form extends Component {
  render() {
    const { handleSubmit, readOnly } = this.props
    return (
      <div className={`card border-${this.props.submitClass}`}>
        <div className={`card-header list-group-item-${this.props.submitClass}`} >
          Formulário de {this.props.submitLabel}
        </div>
        <div class="card-body">
          <form onSubmit={handleSubmit}>
            <p />
            <Field name="title" component={labelAnInput}
              label="Titulo"
              placeholder="Informe o titulo" readOnly={readOnly} />
            <p />
            <Field name="description" component={labelAnInput}
              label="Descrição"
              placeholder="Informe o descrição"
              readOnly={readOnly}
            />
            <p />
            <div className="d-grid gap-2 d-md-block">
              <button type="submit" className={`btn btn-${this.props.submitClass} botao`}>
                {this.props.submitLabel}
              </button>
              <button type="button" className="btn btn-secondary"
                onClick={this.props.init}>Cancelar</button>
            </div>

          </form>
        </div>
      </div>

    )
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ init }, dispatch)
const formNoticias = reduxForm({ form: 'form', destroyOnUnmount: false })(Form)
export default connect(null, mapDispatchToProps)(formNoticias)
