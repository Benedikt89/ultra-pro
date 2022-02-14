import * as React from "react";
import {Component} from "react";
import ButtonGroup from "antd/lib/button/button-group";
import {Button, Card} from "antd";
import {connect} from "react-redux";

import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import {AppStateType} from "../../store/store";
import {selectIsAuth, selectUserData} from "../../store/auth/selectors";
import {selectErrorByKey, selectFetchingByKey} from "../../store/app/selectors";
import {getUserDataThunk, recoverPasswordThunk, updateUserDataThunk} from "../../store/auth/actions";
import {RecoverPasswordData} from "../../store/auth/api";
import {AuthUserData, ProfileFieldType} from "../../types/auth-types";
import {setModal} from "../../store/app/actions";
import {ModalTypes} from "../../types/app-types";

import "./ProfilePage.css";

interface PageProps {
  isAuth: boolean,
  userData: AuthUserData,
  userFields: ProfileFieldType[]
  error: { message: string } | null
  errorPass: { message: string } | null
  isFetching: boolean
  isFetchingPass: boolean
  isFetchingUpdate: boolean
}

interface PageDispatchProps {
  setModal: (type: null | ModalTypes, message: string | null, pass?: string) => void
  recoverPasswordThunk: (data: RecoverPasswordData) => void
  updateUserDataThunk: (data: ProfileFieldType[]) => void
  getUserDataThunk: () => void
}

interface PageState {
  selectedForm: string
  waitForPass: boolean
  waitForSucess: boolean
}

class ProfilePage extends Component<PageProps & PageDispatchProps, PageState> {
  constructor(props: PageProps & PageDispatchProps) {
    super(props);
    this.state = {
      selectedForm: 'user',
      waitForPass: false,
      waitForSucess: false
    }
  }

  componentDidMount() {
    this.props.getUserDataThunk();
  }

  componentDidUpdate(prevProps: Readonly<PageProps & PageDispatchProps>, prevState: Readonly<PageState>, snapshot?: any): void {
    if (!this.props.isFetchingPass && prevProps.isFetchingPass && this.state.waitForPass && !this.props.errorPass) {
      this.setState({waitForPass: false});
      this.props.setModal('success', 'reset_pass_success');
    }
    if (!this.props.isFetchingUpdate && prevProps.isFetchingUpdate && this.state.waitForSucess && !this.props.error) {
      this.props.setModal('success', 'update_user_data_success');
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      updateUserDataThunk,
      isFetching,
      isFetchingUpdate,
      userData,
      userFields,
      errorPass,
      isFetchingPass,
      recoverPasswordThunk
    } = this.props;
    return (
      <div className="content-wrapper">
        <h2 className="profile-page-header">{'title_profile_page'}</h2>

        <ButtonGroup>
          <Button
            type="text"
            className={this.state.selectedForm === "user" ? "profile-page-selected-form" : ""}
            onClick={() => this.setState({selectedForm: 'user'})}
          >
            {'button_profile'}
          </Button>
          <Button type="text"
                  className={this.state.selectedForm !== "user" ? "profile-page-selected-form" : ""}
                  onClick={() => this.setState({selectedForm: 'password'})}
          >
            {'button_password'}
          </Button>
        </ButtonGroup>

        <Card>
          {this.state.selectedForm === 'user'
            ? <ProfileForm userRole={userData.role || ''} onSubmit={(data) => {
              updateUserDataThunk(data);
              this.setState({waitForSucess: true});
            }} fields={userFields} loading={isFetchingUpdate || isFetching}/>
            : <PasswordForm isFetching={isFetchingPass} waitForPass={this.state.waitForPass && !errorPass}
                            onSubmit={(data: RecoverPasswordData) => {
                              this.setState({waitForPass: true});
                              recoverPasswordThunk(data)
                            }}
            />
          }
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state: AppStateType): PageProps => {
  return {
    userData: selectUserData(state),
    userFields: state.auth.userFields,
    isAuth: selectIsAuth(state),
    error: selectErrorByKey(state, 'updateUserData'),
    errorPass: selectErrorByKey(state, 'recoverPassword'),
    isFetching: selectFetchingByKey(state, 'getUserData'),
    isFetchingUpdate: selectFetchingByKey(state, 'updateUserData'),
    isFetchingPass: selectFetchingByKey(state, 'recoverPassword'),
  }
};

export default connect(mapStateToProps, {
  recoverPasswordThunk,
  getUserDataThunk,
  updateUserDataThunk,
  setModal
})(ProfilePage);
