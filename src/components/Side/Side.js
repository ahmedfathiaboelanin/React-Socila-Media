import React from 'react'
import './Side.css'
import Items from '../ListItem/ListItem'
import Pic from '../../Img/undraw_Male_avatar_re_y880.png'
function Side(props) {
    let style = {}
    if (props.dir === 'right') {
        style = { right: 0 };
    } else {
        style = { left: 0 };
  }
  let data = props.arr;
  return (
    <div style={style} className="side col-sm-3 d-sm-flex d-none">
      <h5>{props.title}</h5>
      {data.map((e) => {
        return <Items key={e._id} img={Pic} id={e.user2} />
      })}
    </div>
  );
}

export default Side