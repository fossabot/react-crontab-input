import React from 'react';
import ReactDOM from 'react-dom';
import CrontabInput from './CrontabInput';

ReactDOM.render(<div>

  <CrontabInput locale={"en"}/>

  <hr style={{ margin: 50 }}/>

  <CrontabInput locale={"zh_CN"}/>

</div>, document.getElementById('root'));
