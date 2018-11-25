import React, { PureComponent } from 'react';
import { CodeConfirmationForm } from '../components/CodeConfirmationForm';
import { connect } from 'react-redux';

export class CodeConfirmation extends PureComponent {
  public render() {
    return (
      <div>
        <CodeConfirmationForm email="email" onConfirmed={this.handleConfirmationCode} />
      </div>
    );
  }

  private handleConfirmationCode = () => {
    //
  };
}

const mapStateToProps = (state: any) => ({
  registration: state.registration,
});

// const mapDispatchToProps = dispatch => ({})

connect(mapStateToProps)(CodeConfirmation);
