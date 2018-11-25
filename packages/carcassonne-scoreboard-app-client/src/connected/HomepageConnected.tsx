import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { HomepageComponent } from '../components/Homepage';

export class Homepage extends PureComponent {
  public render() {
    return <HomepageComponent />;
  }
}

const mapStateToProps = (state: any) => ({
  registration: state.registration,
});

// const mapDispatchToProps = dispatch => ({})

connect(mapStateToProps)(Homepage);
