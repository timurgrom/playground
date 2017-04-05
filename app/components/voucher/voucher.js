import './voucher.scss';
import edit from 'assets/images/edit.svg';

import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

const signs = {
  'USD': '$',
  'EUR': '€',
  'ILS': '₪',
};

export class Voucher extends React.Component {

  constructor(props) {
    super(props);

    this.inspectionPressed = this.inspectionPressed.bind(this);

    this.state = {
      sign: this.getCurrencySign(this.props.voucher.currency),
      btnPressed: ''
    };
  }

  getCurrencySign(currency) {
    return signs[currency];
  }

  inspectionPressed(text) {
    this.setState({
      btnPressed: text
    });
  }

  render() {
    const voucher = this.props.voucher;

    return (
      <Row className="voucher" >
        <Col xs={ 4 }>
          <Row>
            <Col xs={ 2 } className="brand-img">
              <img src={ voucher.brand_image_url } width="35px" height="35px" />
            </Col>
            <Col xs={ 8 } className="info">
              <p>{ voucher.brand_name }</p>
              <p>S/N: { voucher.serial_number }</p>
              <p>CVV: { voucher.cvv }</p>
            </Col>
            <Col xs={ 2 } className="edit">
              <img src={ edit } width="15px" height="15px" onClick={ () => this.props.edit(voucher.id) } />
            </Col>
          </Row>
        </Col>
        <Col xs={ 2 }>
          <div style={ { textAlign: 'center' } }>
            <p>{ voucher.face_value + this.state.sign }</p>
          </div>
        </Col>
        <Col xs={ 2 }>
          <div style={ { textAlign: 'center', lineHeight: '8px', paddingTop: '5px' } }>
            <p>{ voucher.asking_price + this.state.sign }</p>
            <p>({ voucher.discount })</p>
          </div>
        </Col>
        <Col xs={ 4 }>
          <Row>
            <Col xs={ 5 }>
              <p>{ voucher.seller }</p>
            </Col>
            <Col xs={ 7 }>
            {
              this.state.btnPressed !== '' ? <div className="btn-pressed">{ this.state.btnPressed }</div>
                : <Btns clicked={ this.inspectionPressed } />
            }
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export class VoucherView extends React.Component {

  constructor() {
    super();

    this.state = {
      btnPressed: ''
    };
  }

  render() {
    const voucher = this.props.viewed;

    return (
      <Grid style={ { 'width': '100%' } }>
        <Row>
          <Col xs={ 6 }>
            <Editor text={ 'Owner' } input={ false } info={ voucher.seller } />
            <Editor text={ 'Serial' } input={ true } info={ voucher.serial_number } />
            <Editor text={ 'Paper Voucher' } input={ true } info={ voucher.paper_voucher } />
            <Editor text={ 'CVV' } input={ true } info={ voucher.cvv } />
            <Editor text={ 'Bulk ID' } input={ true } info={ voucher.bulk_id } />
            <Editor text={ 'Invoice Number' } input={ true } info={ voucher.invoice_number } />
            <Editor text={ 'Order Number' } input={ false } info={ voucher.order_number } />
            <Editor text={ 'Brand' } input={ true } info={ voucher.brand_name } />
            <Editor text={ 'Status' } input={ false } info={ voucher.status } />
          </Col>
          <Col xs={ 6 }>
          {
            this.state.btnPressed !== '' ? <div>{ this.state.btnPressed }</div>
            : <Btns clicked={ () => this.props.hide() } />
          }
          </Col>
        </Row>
      </Grid>
    );
  }
}

class Editor extends React.Component {
  render() {
    return (
      <div className="editor">
        <p className="editor-left">{ this.props.text }</p>
        {
          this.props.input ? <input className="editor-right" type="text" placeholder={ this.props.info } />
          : <p className="editor-right">{ this.props.info }</p>
        }
      </div>
    );
  }
}

class Btns extends React.Component {
  render() {
    return (
      <div className="btns">
        <div className="accept" onClick={ () => this.props.clicked('Accepted') }>Accept</div>
        <div className="decline" onClick={ () => this.props.clicked('Declined') }>Decline</div>
      </div>
    );
  }
}
