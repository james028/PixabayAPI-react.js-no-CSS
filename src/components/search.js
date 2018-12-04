import React, { Component } from "react";
import { render } from "react-dom";
import "../styles.css";
import axios from "axios";
import Modal from "react-modal";

const API_KEY = "10890906-8931739fd6e432500301eef84";

class App extends Component {
  state = {
    currImg: "",
    modal: false,
    searchText: "",
    amount: "",
    images: [],
    options: [
      {
        name: "Select…",
        value: null
      },
      {
        name: 5,
        value: 5
      },
      {
        name: 10,
        value: 10
      },
      {
        name: 15,
        value: 15
      }
    ]
  };

  onSubmitPhotos = e => {
    e.preventDefault();

    //let val = e.target.elements.searchText.value;
    let val = e.target.value;
    this.setState(
      {
        [e.target.name]: val
      },
      () => {
        if (val === "") {
          this.setState({
            images: []
          });
        } else {
          axios
            .get(
              `https://pixabay.com/api/?key=${API_KEY}&q=${
                this.state.searchText
              }&image_type=photo&per_page=${this.state.amount}&pretty=false`
            )
            .then(res => {
              this.setState({
                images: res.data.hits
              });
              console.log(res.data.hits);
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  showModal = e => {
    this.setState({
      modal: true,
      currImg: e
    });
  };

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    return (
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <form>
          <input
            type="text"
            name="searchText"
            value={this.state.searchText}
            onChange={this.onSubmitPhotos}
          />
          <select
            onChange={this.onSubmitPhotos}
            name="amount"
            value={this.state.amount}
          >
            {this.state.options.map(item => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px"
          }}
        >
          {this.state.images.length > 0
            ? this.state.images.map(e => {
                return (
                  <div key={e.id}>
                    <img
                      src={e.largeImageURL}
                      className="photo"
                      onClick={() => this.showModal(e.largeImageURL)}
                      alt="modal-ph-1"
                    />
                    <Modal isOpen={this.state.modal}>
                      modal
                      <button onClick={this.closeModal}>Close</button>
                      <img
                        src={this.state.currImg}
                        className="photo"
                        alt="modal-ph"
                      />
                    </Modal>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default App;
