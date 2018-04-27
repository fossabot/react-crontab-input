import React from 'react';
import ReactDOM from 'react-dom';
import CrontabInput from './CrontabInput';

ReactDOM.render(<div>

  <CrontabInput/>

  <hr style={{ margin: 50 }}/>

  <CrontabInput locale={"zh_CN"}/>

</div>, document.getElementById('root'));
