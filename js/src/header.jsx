class NavButton extends React.Component {
    constructor() {
        super();

        this.state = {
            css : {
                color : "#FFFFFF",
                float : "left",
                padding : "7px"
            }
        }
    }
    render() {
        return (
            <div style={this.state.css}>
                {this.props.label}
            </div>
        );
    }
}

class LoginBox extends React.Component {
    constructor() {
        super();

        this.state = {
            css : {
                base : {
                    padding : "5px"
                },
                input : {
                    background : "#FFFFFF",
                    border : "5px solid #666666",
                    padding : "3px 6px"
                }
            }
        }
    }
    login(e) {
        e.preventDefault();
        var setAuthenticationState = this.props.setAuthenticationState;
        ajax.post({
            url : "login",
            data: {
                "username"              : login_form.username.value,
                "password"              : login_form.password.value,
            },
            success : function(data){
                if (data == "success")
                    setAuthenticationState(true);
            }
        });

        return false;
    }

    render() {
        return (
            <form   name="login_form"
                    method="post"
                    onSubmit={this.login.bind(this)}
                    style={this.state.css.base}>
                <input  style={this.state.css.input}
                        name="username"
                        type="text"
                        placeholder="username"/>
                <input  style={this.state.css.input}
                        name="password"
                        type="password"
                        placeholder="password"/>
                <input  style={this.state.css.input}
                        type="submit"
                        value="Login"/>
            </form>
        );
    }
}

class UserBox extends React.Component {
    constructor() {
        super();
        this.state = {
            css : {
                base : {

                },
                logout : {
                    color : "#ffffff",
                    textDecoration  : "none",
                }
            }
        }
    }

    logout(e) {
        ajax.get({
            url : 'logout'
        });
        this.props.setAuthenticationState(false);
    }

    render() {
        return (
            <div>
            { this.props.is_authenticated
                ? <NavButton label="Logout"
                             onClick={this.logout.bind(this)} style={this.state.css.logout} />
                : <LoginBox setAuthenticationState={this.props.setAuthenticationState} />
            }
            </div>
        );
    }
}


export class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            css : {
                background : "#999999",
                overflow : "auto",
            }
        };
    }

    render() {
        return (
            <div style={this.state.css}>
                <UserBox    is_authenticated={this.props.is_authenticated}
                            setAuthenticationState={this.props.setAuthenticationState} />
            </div>
        );
    }
}
