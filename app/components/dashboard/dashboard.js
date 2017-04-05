import './dashboard.scss';

import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Voucher, VoucherView } from '../voucher/voucher.js';
import vouchers from './vouchers.json';

const styles = {
  grid: {
    'width': '100%'
  },
  gridHeader: {
    'backgroundColor': '#19A4E8',
    'height': '38px',
    'lineHeight': '38px',
    'color': 'white'
  }
};

@observer
export class Dashboard extends React.Component {
  @observable vouchers = vouchers

  constructor() {
    super();

    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);

    this.state = {
      editingVoucher: false,
      viewed: {}
    };
  }

  showEdit(id) {
    const voucher = this.vouchers.find((obj) => {
      if (obj.id === id) {
        return obj;
      }
    });

    this.setState({
      editingVoucher: true,
      viewed: voucher
    });

  }

  hideEdit() {
    this.setState({
      editingVoucher: false
    });
  }

  render() {
    return (
      <div>
      {
        this.state.editingVoucher ? <VoucherView viewed={ this.state.viewed } hide={ this.hideEdit } />
        : <Grid style={ styles.grid }>
            <Row>
              <Col xs={ 4 } style={ styles.gridHeader }>Info</Col>
              <Col xs={ 2 } style={ styles.gridHeader }>Face Value</Col>
              <Col xs={ 2 } style={ styles.gridHeader }>Asking Value</Col>
              <Col xs={ 4 } style={ styles.gridHeader }>Seller</Col>
            </Row>
            {
              this.state.editingVoucher ? <VoucherView />
                : this.vouchers.map((voucher, index) => {
                  return <Voucher key={ index } voucher={ voucher } edit={ this.showEdit } />;
                })
            }
          </Grid>
      }
      </div>
    );
  }
}
