import React from 'react';
import './App.css';
import users from './users.json';
import linkedin from './linkedin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';

interface User {
  firstName: string;
  lastName: string;
  id: string;
  campus: string;
  role: string;
  linkedin?: string;
}

interface AppState {
  users: User[];
  student: boolean;
  teacher: boolean;
  search: string;
  campuses: string[];
  selected: string;
}

class App extends React.Component<{}, AppState> {
  state = {
    users: users,
    student: false,
    teacher: false,
    search: '',
    campuses: Array.from(new Set(users.map(user => user.campus))),
    selected: '',
  };

  filterStudents = (users: User[]): User[] => {
    return this.state.student
      ? users.filter(user => user.role === 'student')
      : users;
  };

  filterTeachers = (users: User[]): User[] => {
    return this.state.teacher
      ? users.filter(user => user.role === 'teacher')
      : users;
  };

  filterSearch = (users: User[]): User[] => {
    const { search } = this.state;

    return users.filter(user => {
      const name = user.firstName + user.lastName;
      return new RegExp(search.toLowerCase()).test(name.toLowerCase());
    });
  };

  filterCampus = (users: User[]): User[] => {
    return users.filter(user =>
      this.state.selected ? user.campus === this.state.selected : user,
    );
  };

  renderTable = () => {
    // const { search } = this.state;
    const users = this.filterSearch(
      this.filterTeachers(
        this.filterStudents(this.filterCampus([...this.state.users])),
      ),
    );

    return users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          <td>
            {user.linkedin && (
              <a href={user.linkedin}>
                <img className="linkedin-logo" src={linkedin} alt="linkedin" />
              </a>
            )}
          </td>
        </tr>
      );
    });
  };

  componentDidUpdate = () => {
    console.log(this.state);
  };

  renderOptions = () => {
    return this.state.campuses.map(campus => (
      <option key={campus}>{campus}</option>
    ));
  };

  renderFilterSection = () => {
    return (
      <Form>
        <FormGroup>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search here by name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              this.setState({ search: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="student"
            id="student"
            checked={this.state.student}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              this.setState({ student: e.target.checked })
            }
          />
          <Label htmlFor="student">Student</Label>
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.teacher}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              this.setState({ teacher: e.target.checked })
            }
          />
          <Label htmlFor="teacher">Teacher</Label>
        </FormGroup>
        <FormGroup>
          <Label for="campus">Campus</Label>
          <Input
            type="select"
            name="campus"
            id="campus"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              this.setState({ selected: e.target.value })
            }
          >
            {this.renderOptions()}
          </Input>
        </FormGroup>
      </Form>
    );
  };

  render = () => {
    return (
      <div className="App">
        <div>
          <Jumbotron className="mb-0 pb-0">
            <h1 className="display-2">Iron Book</h1>

            {this.renderFilterSection()}
          </Jumbotron>
        </div>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>

            {this.renderTable()}
          </thead>
        </Table>
      </div>
    );
  };
}

export default App;
