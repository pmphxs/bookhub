import React from 'react';
import PropTypes from 'prop-types';

import TopFixed from '../../components/top-fixed/index';
import Table from '../../components/table/index';
import styles from './book-add.scss';

import { addBookMeta } from '../../actions';


// https://github.com/electron/electron/issues/9920
const { ipcRenderer } = window.require('electron');

/* eslint-disable react/prefer-stateless-function */
class BookAdd extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleDeselectAll = this.handleDeselectAll.bind(this);
  }
  componentDidMount() {
    ipcRenderer.on('scan:book:found', (e, metaInfo) => {
      // console.log(this.store.getState().scanLog.length);
      this.store.dispatch(addBookMeta(metaInfo));
    });
  }
  handleSelectAll() {
    console.log('selectall', this);
  }
  handleDeselectAll() {
    console.log('deselectall', this);
  }
  render() {
    return (
      <div className={styles.wrap}>
        <TopFixed type="add" />
        <div className={styles.contentWrap}>
          <Table {...this.props} />
        </div>
        <div className={styles.operationGrop}>
          <div className={styles.leftBtnGrop}>
            <span role="button" className={styles.selectBtn} onClick={this.handleSelectAll}>全选</span>
            <span role="button" className={styles.selectBtn} onClick={this.handleDeselectAll}>全不选</span>
          </div>
          <button className={styles.addHub}>加入书库</button>
        </div>
      </div>
    );
  }
}

BookAdd.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

export default BookAdd;
