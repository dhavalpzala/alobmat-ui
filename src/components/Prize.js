import React from 'react';

export default class Prize extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const data = this.props.data,
          name = data.name,
          isAvailable = data.winner === null,
          winner = data.winner || {};

    return (
      <div className="card prize">
        <div className="card-content">
          <p className="subtitle is-8">
            {winner.id ? `${name}`: `${name}`}<span className="is-pulled-right">{winner.id ? <img className="image avatar is-rounded is-inline is-16x16" src={winner.avatar_url} />: false}{winner.id ? winner.name: ""}</span>
          </p>
        </div>
      </div>
    )

    /* return (
      <div className="tags has-addons is-fullwidth">
        <span className={"tag " + (data.winner === null ? 'is-success': 'is-danger')}>{data.name}</span>
        <span className="tag">{data.reward}</span>
        <span className="tag is-info">
          {data.winner !== null? <img className="image is-rounded is-32x32" src={data.winner.avatar_url} />: false}  
        </span>
      </div>
    ) */
  }
}