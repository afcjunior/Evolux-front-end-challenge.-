import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom";
// import Component from '../Component'
import { connect } from 'react-redux'
import { fetchData } from '../../actions/shared'
import LoadingBar from 'react-redux-loading'
import NumbersList from '../NumbersList'
import Pagination from '../Pagination'
import PerPage from '../PerPage'

import './index.css'

class App extends Component {

  componentDidMount(){
    const meta = {
      page: 1,
      perPage: 100
    }
    this.props.dispatch(fetchData(meta))
  }

  //pretty sure there are better ways but its where I am atm
  perPageA = () => {
    this.props.dispatch(fetchData({ page: 3, perPage: 100}))
  }
  perPageB = () => {
    this.props.dispatch(fetchData({ perPage: 500}))
  }
  perPageC = () => {
    this.props.dispatch(fetchData({ perPage: 1000}))
  }
  nextPage = () => {
    let page = 5
    this.props.dispatch(fetchData({ page: page}))

  }
  render() {

    return (
      <Fragment>
        <LoadingBar/>
        {this.props.loading === true
          ? null
          : <div className="container">
              <button onClick={this.nextPage}>-----------</button>
              <PerPage perPageA={this.perPageA} perPageB={this.perPageB} perPageC={this.perPageC}/>
              <NumbersList numbers={this.props.numbers} />
              <Pagination pages={this.props.meta}/>
            </div>

        }
      </Fragment>

    )
  }
}

function mapStateToProps ({ meta, numbers }){
  let dirtyArray = []
  for(let key in numbers){
    dirtyArray.push(numbers[key]);
  }

  return{
    meta,
    numbers: dirtyArray,
    loading: numbers[0] === undefined
  }
}
export default connect(mapStateToProps)(App)

