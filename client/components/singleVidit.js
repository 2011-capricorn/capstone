import React from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import TreeMap from './TreeMap'
import ChartVoting from './ChartVoting'
import './styles/SingleVidit.css'
import firebase from '../../public/firebase'
import LoadingScreen from './LoadingScreen'
const db = firebase.firestore()
// db.collection('users')
//   .doc('Qcnh71oMAUn89QMyLq28')
//   .onSnapshot((doc) => console.log('Current data: ', doc.data()))
const SingleVidit = (props) => {
  // console.log(1111, props.match.params)
  const {id} = props.match.params
  const data = props.allVidit.filter((vidit) => vidit.pollKey === id)[0]
  const userAnswered = props.answered.some((key) => key === data.pollKey)
  console.log('Single Vidit Data --->', data)
  return data ? (
    <div>
      <h1 id="SVTitle">{data.question}</h1>
      {!userAnswered && <ChartVoting pollKey={id} />}
      {data.type === 'Multiple 2' && (
        <PieChart size={[500, 500]} pollKey={id} />
      )}
      {(data.type === 'Multiple +' || data.type === 'Range') && (
        <BarChart
          pollKey={id}
          rangeLabel1={data.rangeLabel1}
          rangeLabel5={data.rangeLabel5}
          rangeLabel10={data.rangeLabel10}
          masterLabel={data.masterLabel}
          type={data.type}
          choices={data.choices}
        />
      )}
      {data.type === 'Open' && data.dataType === 'Number' && (
        <LineChart pollKey={id} units={data.units} />
      )}
      {data.type === 'Open' && data.dataType === 'String' && (
        <TreeMap pollKey={id} />
      )}
    </div>
  ) : (
    <LoadingScreen />
  )
}
const mapState = ({user: {answered}, vidit: {allVidit}}) => ({
  allVidit,
  answered,
})
export default connect(mapState)(SingleVidit)
