$(document).ready(function () {
  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // // Start file download.
  // download("hello.txt","This is the content of my file :)");

  function temp(data) {
    return (
      '<div class="col p-0 mb-2"><div data-toggle="tooltip" title="Click To Copy" class="bg-default text-white copy_content cursor-pointer m-0 p-3 card">' +
      data +
      "</div></div>"
    );
  }
  var row = $(".row_data").html();
  $(document).on("click", ".add_new", function () {
    $(".row_data").append(row);
  });

  $(document).on("click", ".reset_data", function () {
    $(".row_data").html(row);
  });
  /*
  .########..########....###.....######..########
  .##.....##.##.........##.##...##....##....##...
  .##.....##.##........##...##..##..........##...
  .########..######...##.....##.##..........##...
  .##...##...##.......#########.##..........##...
  .##....##..##.......##.....##.##....##....##...
  .##.....##.########.##.....##..######.....##...
  */

  /*
  .########.....###.....######...########..######.
  .##.....##...##.##...##....##..##.......##....##
  .##.....##..##...##..##........##.......##......
  .########..##.....##.##...####.######....######.
  .##........#########.##....##..##.............##
  .##........##.....##.##....##..##.......##....##
  .##........##.....##..######...########..######.
  */

  $(document).on("click", ".generateReactPages", function () {
    $(".resultReactPages").slideDown();

    ele_length = $(".row_data .one_row").length;
    var data = { post_name: $(".post_name").val(), elements: [], };
    for (let index = 0; index < ele_length; index++) {
      var ele = [
        $(".row_data .one_row").eq(index).find(".key_name").val(),
        $(".row_data .one_row").eq(index).find(".key_type").val(),
        $(".row_data .one_row").eq(index).find(".key_priority").val(),
      ];
      data.elements.push(ele);
    }

    $("#resultReactPages").html(`

    // export * from "./${data.post_name}/";
    // export * from "./${data.post_name}/Get${capitalize(data.post_name)}";
    // export * from "./${data.post_name}/Add${capitalize(data.post_name)}";
    // export * from "./${data.post_name}/Update${capitalize(data.post_name)}";
    // ${capitalize(data.post_name)}s,
    // Get${capitalize(data.post_name)},
    // Add${capitalize(data.post_name)},
    // Update${capitalize(data.post_name)},

    <ProtectedRoute 
      path={\`/${data.post_name}\`} 
      exact 
      component={${capitalize(data.post_name)}s} />

    <ProtectedRoute
      path={\`/${data.post_name}/:id\`}
      exact
      component={Get${capitalize(data.post_name)}}
    />

    <ProtectedRoute
      path={\`/${data.post_name}/add\`}
      exact
      component={Add${capitalize(data.post_name)}}
    />

    <ProtectedRoute
      path={\`/${data.post_name}/update/:id\`}
      exact
      component={Update${capitalize(data.post_name)}}
    />
    `);

    function dataTypesYup(type, status) {
      if (type == "string") {
        return `string().min(1)${status === "required" ? ".required()" : ""}`;
      } else if (type == "email") {
        return `string().email()${status === "required" ? ".required()" : ""}`;
      } else if (type == "number") {
        return `number().min(1)${status === "required" ? ".required()" : ""}`;
      } else if (type == "phone") {
        return `number().min(9)${status === "required" ? ".required()" : ""}`;
      } else if (type == "boolean") {
        return `boolean()${status === "required" ? ".required()" : ""}`;
      } else if (type == "date") {
        return `date()${status === "required" ? ".required()" : ""}`;
      } else {
        return "false";
      }
    }

    function dataTypesFormik(type) {
      if (type == "string") {
        return `text`;
      } else if (type == "email") {
        return `email`;
      } else if (type == "number") {
        return `number`;
      } else if (type == "phone") {
        return `tel`;
      } else if (type == "boolean") {
        return `text`;
      } else if (type == "date") {
        return `date`;
      } else {
        return "false";
      }
    }

    var else_ele_state = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_state += `${data.post_name}${capitalize(
        data.elements[index][0]
      )} :"",`;
    }

    var else_ele_initialValues = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_initialValues += `${data.post_name}${capitalize(
        data.elements[index][0]
      )} : this.state.${data.post_name}${capitalize(data.elements[index][0])},`;
    }

    var else_ele_Yup = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_Yup += `${data.post_name}${capitalize(
        data.elements[index][0]
      )} : Yup.${dataTypesYup(
        data.elements[index][1],
        data.elements[index][2]
      )},`;
    }
    var else_ele_Controller = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_Controller += `${data.post_name}${capitalize(
        data.elements[index][0]
      )},`;
    }

    var else_ele_FormikContent = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_FormikContent += `
      <FormGroup>
      <Label>${capitalize(data.elements[index][0])}</Label>
      <Input
        invalid={errors.${data.post_name}${capitalize(
        data.elements[index][0]
      )} && touched.${data.post_name}${capitalize(data.elements[index][0])}}
        type="${dataTypesFormik(data.elements[index][1])}"
        onBlur={handleBlur}
        onChange={(e) => {this.handleChangeFormik(e.target.name,e.target.value)}}
        name="${data.post_name}${capitalize(data.elements[index][0])}"/>
        {errors.${data.post_name}${capitalize(
        data.elements[index][0]
      )} && touched.${data.post_name}${capitalize(
        data.elements[index][0]
      )} ? (<Badge className="m-1 text-danger" color="neutral-danger">{errors.${
        data.post_name
      }${capitalize(data.elements[index][0])}}</Badge>) : null}
      </FormGroup>


      `;
    }
    var NavPage = `
    import React, { Component } from "react";
    import { Nav, NavItem, NavLink } from "reactstrap";
    import clsx from "clsx";
    import { Link } from "react-router-dom";

    class Nav${capitalize(data.post_name)} extends Component {
      state = {
        activeTab: "/${data.post_name}s",
      };
      toggle = (tab) => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
      };
      render() {
        return (
          <div className="tabs-animated tabs-animated-line">
            <Nav tabs justified>
              {this.props.taps.map((tap) => (
                <NavItem key={Math.floor(Math.random() * 11111)}>
                  <NavLink
                    tag={Link}
                    to={tap.to}
                    className={clsx({
                      active: this.props.props.match.path === tap.path,
                    })}
                  >
                    <span>{tap.name}</span>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        );
      }
    }

    export default Nav${capitalize(data.post_name)};

    `;
    download(`Nav${capitalize(data.post_name)}.js`, NavPage);

    // append in Main Page
    var MainPage = `
    import React from "react";
    import { connect } from "react-redux";

    import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
    
    import {
      Alert,
      CardBody,
      Row,
      Col,
      Card,
      TabContent,
      TabPane,
    } from "reactstrap";
    import { NavBar } from "../../components";
    import Nav${capitalize(data.post_name)} from "./Nav${capitalize(
      data.post_name
    )}";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

    import { Link } from "react-router-dom";
    import { URL } from "../../redux/api/api.conf";
    import { getAll${capitalize(data.post_name)}, resetAll${capitalize(
      data.post_name
    )}, deleteAll${capitalize(data.post_name)}, delete${capitalize(
      data.post_name
    )}ByID } from "../../redux/config/";

    class ${capitalize(data.post_name)}sComponent extends React.Component {
      state = {
        ${data.post_name}s: this.props.${data.post_name}s,
      };
      componentDidMount() {
        this.props.getAll${capitalize(data.post_name)}();
      }
      render() {
        const { 
          getAllLoading${capitalize(data.post_name)},
          getAllSuccess${capitalize(data.post_name)},
          getAllFailed${capitalize(data.post_name)},

          deleteAllLoading${capitalize(data.post_name)},
          deleteAllSuccess${capitalize(data.post_name)},
          deleteAllFailed${capitalize(data.post_name)},
          
          deleteLoading${capitalize(data.post_name)},
          deleteSuccess${capitalize(data.post_name)},
          deleteFailed${capitalize(data.post_name)},
         } = this.props

        return(
          <React.Fragment>
          <Card className="card-box mb-5">
            {(() => {
              if (GETALLSUCCESS${data.post_name.toUpperCase()} !== null) {
                return (
                  <Nav${capitalize(data.post_name)}
                    props={this.props}
                    taps={[
                      {
                        name: "الاقسام",
                        path: "/${data.post_name}s",
                        to: "/${data.post_name}s",
                      },
  
                      {
                        name: "منتجات القسم",
                        path: "/${data.post_name}/:id",
                        to: "/${data.post_name}/" + this.props.match.params.id,
                      },
                      {
                        name: "تعديل القسم",
                        path: "/${data.post_name}/update/:id",
                        to: "/${
                          data.post_name
                        }/update/" + this.props.match.params.id,
                      },
                      {
                        name: "أضافة منتج جديد",
                        path: "/${data.post_name}/add",
                        to: "/${data.post_name}/add",
                      },
                    ]}
                  />
                );
              }
            })()}{" "}
            <TabContent className="p-4 pt-0" activeTab="/${data.post_name}s">
              <TabPane className="active">
                {(() => {
                  if (getAllLoading${capitalize(data.post_name)}) {
                    return (
                      <CardBody>
                        <SkeletonTheme color="#f0f0f0" highlightColor="#fff">
                          <p>
                            <Skeleton duration={1} />
                          </p>
                          <p>
                            <Skeleton duration={2} />
                          </p>
                          <p>
                            <Skeleton duration={3} />
                          </p>
                          <p className="mb-0">
                            <Skeleton duration={4} />
                          </p>
                        </SkeletonTheme>
                      </CardBody>
                    );
                  } else if (GETALLSUCCESS${data.post_name.toUpperCase()} !== null) {
                    return (
                      <Row>
                        {getAllSuccess${capitalize(data.post_name)}.${data.post_name}s.map((${data.post_name}) => (
                          <Col md="6" lg="12" xl="6" key={${data.post_name}._id}>
                            <Card className="mb-5">
                              <div className="p-1">
                                <Row className="no-gutters">
                                  <Col md="12">
                                    <img
                                      alt={${data.post_name}.${data.post_name}Name}
                                      className="img-fluid w-100"
                                      src={
                                        URL +
                                        \`/image/\${getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Img}/512/512/100\`
                                      }
                                    />
                                  </Col>
                                  <Col
                                    md="9"
                                    className="d-flex align-items-center"
                                  ></Col>
                                </Row>
                              </div>
                              <div className="divider ltr" />
                              <div className="font-size-md font-weight-bold mb-1 text-dark p-1">
                                {${data.post_name}.${data.post_name}Name}
                              </div>
  
                              <div className="divider ltr" />
                              <Link
                                tag="Button"
                                className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center"
                                to={\`/${data.post_name}/\` + ${data.post_name}._id}>
                                عرض
                                <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                              </Link>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    );
                  } else if (getAllFailed${capitalize(data.post_name)} !== null) {
                    return <Alert color="danger">{getAllFailed${capitalize(data.post_name)}}</Alert>;
                  } else {
                    return <Alert color="danger"> </Alert>;
                  }
                })()}{" "}
              </TabPane>
            </TabContent>{" "}
          </Card>
        </React.Fragment>

        );
      }
    }
    
    const mapStateToProps = ({ ${data.post_name} }) => {
      return {
        getAllLoading${capitalize(data.post_name)}: ${data.post_name}.getAllLoading${capitalize(data.post_name)},
        getAllSuccess${capitalize(data.post_name)}: ${data.post_name}.getAllSuccess${capitalize(data.post_name)},
        getAllFailed${capitalize(data.post_name)}: ${data.post_name}.getAllFailed${capitalize(data.post_name)},

        deleteAllLoading${capitalize(data.post_name)}: ${data.post_name}.deleteAllLoading${capitalize(data.post_name)},
        deleteAllSuccess${capitalize(data.post_name)}: ${data.post_name}.deleteAllSuccess${capitalize(data.post_name)},
        deleteAllFailed${capitalize(data.post_name)}: ${data.post_name}.deleteAllFailed${capitalize(data.post_name)},

        deleteLoading${capitalize(data.post_name)}: ${data.post_name}.deleteLoading${capitalize(data.post_name)},
        deleteSuccess${capitalize(data.post_name)}: ${data.post_name}.deleteSuccess${capitalize(data.post_name)},
        deleteFailed${capitalize(data.post_name)}: ${data.post_name}.deleteFailed${capitalize(data.post_name)},
      };
    };
    
    const ${capitalize(data.post_name)}s = connect(mapStateToProps, {
      resetAll${capitalize(data.post_name)}, 
      getAll${capitalize(data.post_name)}, 
      deleteAll${capitalize(data.post_name)}, 
      delete${capitalize(data.post_name)}ByID  })(${capitalize(data.post_name)}sComponent);
    export { ${capitalize(data.post_name)}s };
    `;
    download(`index.js`, MainPage);

    var getPage = `
    import React from "react";
    import { connect } from "react-redux";
    import Slider from "react-slick";
    import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

    // import { Link } from "react-router-dom";
    import {
      Container,
      Alert,

      CardBody,
      Row,
      Col,
      Card,
      TabContent,
      TabPane,
    } from "reactstrap";
    import { NavBar } from "../../components";
    import Nav${capitalize(data.post_name)} from "./Nav${capitalize(
      data.post_name
    )}";

    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { URL } from "../../redux/api/api.conf";
    import { 
      reset${capitalize(data.post_name)} } from "../../redux/config/";
      get${capitalize(data.post_name)}ByID, 
      delete${capitalize(data.post_name)}ByID, 
    const widgetsCarousels4A = {
      dots: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <SliderArrowNext />,
      prevArrow: <SliderArrowPrev />,
      responsive: [
        {
          breakpoint: 1450,
          settings: { slidesToShow: 5, slidesToScroll: 1 },
        },
        {
          breakpoint: 1100,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 900,
          settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
      ],
    };
    function SliderArrowNext(props) {
      const { className, onClick } = props;
      return (
        <div className={className} onClick={onClick}>
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </div>
      );
    }
    
    function SliderArrowPrev(props) {
      const { className, onClick } = props;
      return (
        <div className={className} onClick={onClick}>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </div>
      );
    }
        
    class Get${capitalize(data.post_name)}Component extends React.Component {
      state={
        ${data.post_name}Id: null,
        ${else_ele_state}
      }
      componentDidMount() {
        this.props.get${capitalize(data.post_name)}ByID(this.props.match.params.id);
      }
        
      render() {
        const {
          
          getLoading${capitalize(data.post_name)},
          getSuccess${capitalize(data.post_name)},
          getFailed${capitalize(data.post_name)},

          deleteLoading${capitalize(data.post_name)},
          deleteSuccess${capitalize(data.post_name)},
          deleteFailed${capitalize(data.post_name)},

        } = this.props
        return(
        <React.Fragment>
            <Card className="card-box mb-5">
              <Row className="no-gutters">
                <Col xl="12">
                {(() => {
                  if (getAllSuccess${capitalize(data.post_name)} !== null) {
                    return (
                      <Nav${capitalize(data.post_name)}
                      props={this.props}
                      taps={[
                        {
                          name: "${data.post_name}s",
                          path: "/${data.post_name}s",
                          to: "/${data.post_name}s",
                        },
  
                        {
                          name: "${data.post_name}",
                          path: "/${data.post_name}/:id",
                          to: "/${
                            data.post_name
                          }/" + this.props.match.params.id,
                        },
                        {
                          name: "Update ${data.post_name}",
                          path: "/${data.post_name}/update/:id",
                          to: "/${
                            data.post_name
                          }/update/" + this.props.match.params.id,
                        },
                        {
                          name: "Add ${data.post_name} Child",
                          path: "/${data.post_name}/add",
                          to: "/${data.post_name}/add",
                        },
                      ]}
                    />
  
                    );
                  }
                })()}{" "}
                  <TabContent className="p-4 pt-0" activeTab="/${data.post_name}s">
                    <TabPane className="active">
                      {(() => {
                        if (getLoading${capitalize(data.post_name)}) {
                          return (
                            <CardBody>
                            <SkeletonTheme color="#f0f0f0" highlightColor="#fff">
                              <p>
                                <Skeleton duration={1} />
                              </p>
                              <p>
                                <Skeleton duration={2} />
                              </p>
                              <p>
                                <Skeleton duration={3} />
                              </p>
                              <p className="mb-0">
                                <Skeleton duration={4} />
                              </p>
                            </SkeletonTheme>
                          </CardBody>
                          );
                        } else if (
                          getSuccess${capitalize(data.post_name)} &&
                          this.props.${data.post_name} !== null
                        ) {
                          return (
                            <Card className="mb-2">
                              <div className="card-img-wrapper ">
                                <div className="card-badges"></div>
                                <img
                                  alt="..."
                                  className="card-img-top img-fit-container"
                                  src={
                                    URL +
                                    \`/image/\${getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Img}/512/512/100\`
                                  }
                                />
                              </div>
                              <div className="card-body p-2 card-body-avatar rtl">
                                <h3 className="font-weight-bold font-size-xl my-3 text-dark">
                                  {getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Name}
                                </h3>
                                <div className="pt-2">
                                  <Slider
                                    className="rounded-lg overflow-hidden slider-arrows-outside slider-dots-outside slider-dots-light"
                                    {...widgetsCarousels4A}
                                  >
                                    <div>
                                      <a
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}
                                        className="card m-3 shadow-sm-dark card-box-hover-rise"
                                      >
                                        <img
                                          src={
                                            URL +
                                            \`/image/\${getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Img}/512/512/100\`
                                          }
                                          className="card-img-top"
                                          alt="..."
                                        />
                                        <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                                          <p className="text-second opacity-8 mt-4 mb-0">
                                            350+ custom-made, beautiful
                                            components, widgets, pages,
                                            dashboards and applications.
                                          </p>
                                        </div>
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}
                                        className="card m-3 shadow-sm-dark card-box-hover-rise"
                                      >
                                        <img
                                          src={
                                            URL +
                                            \`/image/\${getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Img}/512/512/100\`
                                          }
                                          className="card-img-top"
                                          alt="..."
                                        />
                                        <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                                          <p className="text-second opacity-8 mt-4 mb-0">
                                            350+ custom-made, beautiful
                                            components, widgets, pages,
                                            dashboards and applications.
                                          </p>
                                        </div>
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#/"
                                        onClick={(e) => e.preventDefault()}
                                        className="card m-3 shadow-sm-dark card-box-hover-rise"
                                      >
                                        <img
                                          src={
                                            URL +
                                            \`/image/\${getSuccess${capitalize(data.post_name)}.${data.post_name}.${data.post_name}Img}/512/512/100\`
                                          }
                                          className="card-img-top"
                                          alt="..."
                                        />
                                        <div className="p-3 bg-secondary rounded-bottom p-xl-4">
                                          <p className="text-second opacity-8 mt-4 mb-0">
                                            350+ custom-made, beautiful
                                            components, widgets, pages,
                                            dashboards and applications.
                                          </p>
                                        </div>
                                      </a>
                                    </div>
                                  </Slider>
                                </div>
                              </div>
                            </Card>
                          );
                        } else {
                          return (
                            <Alert color="danger">
                              غير موجود او ربما تم المسح
                            </Alert>
                          );
                        }
                      })()}{" "}
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Card>
        </React.Fragment>
        );

      }
    }
    
    const mapStateToProps = ({ ${data.post_name} }) => {
      return {
        getLoading${capitalize(data.post_name)}: ${data.post_name}.getLoading${capitalize(data.post_name)},
        getSuccess${capitalize(data.post_name)}: ${data.post_name}.getSuccess${capitalize(data.post_name)},
        getFailed${capitalize(data.post_name)}: ${data.post_name}.getFailed${capitalize(data.post_name)},

        deleteLoading${capitalize(data.post_name)}: ${data.post_name}.deleteLoading${capitalize(data.post_name)},
        deleteSuccess${capitalize(data.post_name)}: ${data.post_name}.deleteSuccess${capitalize(data.post_name)},
        deleteFailed${capitalize(data.post_name)}: ${data.post_name}.deleteFailed${capitalize(data.post_name)},
      };
    };
    
    const Get${capitalize(data.post_name)} = connect(mapStateToProps, {  
      get${capitalize(data.post_name)}ByID, 
      delete${capitalize(data.post_name)}ByID, 
      reset${capitalize(data.post_name)}  
    })(Get${capitalize(data.post_name)}Component);
    export { Get${capitalize(data.post_name)} };
    `;
    download(`Get${capitalize(data.post_name)}.js`, getPage);

    var addPage = `

    import React from "react";
    import { connect } from "react-redux";

    import { NavBar } from "../../components";
    import * as Yup from "yup";
    import { Formik, Form } from "formik";

    // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import {
      Row,
      Col,
      Card,
      FormGroup,
      Input,
      Badge,
      TabContent,
      TabPane,
      Button,
      Label,
    } from "reactstrap";
    import { save${capitalize(data.post_name)}, reset${capitalize(data.post_name)} } from "../../redux/config/";
    import Nav${capitalize(data.post_name)} from "./Nav${capitalize(data.post_name)}";

    class Add${capitalize(data.post_name)}Component extends React.Component {
      state={
        ${else_ele_state}
      }
      handleChangeFormik = (ele, value) => { this.setState({ [ele]: value, }); };

      _handleFormSubmit = (fromData, bag) => {
        let data = new FormData();
        data.append("file", this.state.${data.post_name}Img[0]);
        data.append("file_name", "avatar");
        data.set("${capitalize(data.post_name)}Name", fromData.${capitalize(data.post_name)}Name);
        this.props.save${capitalize(data.post_name)}(data);
        this.bag = bag;
      };
      handle${capitalize(data.post_name)}Img = (${data.post_name}Img) => {
        this.setState({ ${data.post_name}Img });
      };
    
      _reset${capitalize(data.post_name)}(){
        this.props.reset${capitalize(data.post_name)}();
      }
      render() {
        const {
          
          saveLoading${capitalize(data.post_name)},
          saveSuccess${capitalize(data.post_name)},
          saveFailed${capitalize(data.post_name)},

        } = this.props

        return (
          <React.Fragment>
            <Card className="card-box mb-5">
              <Row className="no-gutters">
                <Col xl="12">
                  <Nav${capitalize(data.post_name)}
                    props={this.props}
                    taps={[
                      {
                        name: "الاقسام",
                        path: "/${data.post_name}s",
                        to: "/${data.post_name}s",
                      },
                      {
                        name: "أضافة قسم",
                        path: "/${data.post_name}/add",
                        to: "/${data.post_name}/add",
                      },
                    ]}
                  />
                  <TabContent
                    className="p-4 pt-0"
                    activeTab={this.state.activeTab}
                  >
                    <TabPane className="active">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{ ${else_ele_initialValues} }}
                        validationSchema={Yup.object().shape({ ${else_ele_Yup} })}
                        onSubmit={this._handleFormSubmit}
                      >
                        {({
                          handleSubmit,
                          isValid,
                          isSubmitting,
                          handleBlur,
                          errors,
                          touched,
                        }) => (
                          <Form>
                          ${else_ele_FormikContent}
                            <Button
                              type="submit"
                              color="neutral-info ml-2"
                              onClick={handleSubmit}
                              disabled={!isValid || isSubmitting}
                            >
                              أضافة
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Card>
        </React.Fragment>
        );
      }
    }
    
    const mapStateToProps = ({ ${data.post_name} }) => {
      return {
        saveLoading${capitalize(data.post_name)}: ${
      data.post_name
    }.saveLoading${capitalize(data.post_name)},
        saveSuccess${capitalize(data.post_name)}: ${
      data.post_name
    }.saveSuccess${capitalize(data.post_name)},
        saveFailed${capitalize(data.post_name)}: ${
      data.post_name
    }.saveFailed${capitalize(data.post_name)},
      };
    };
    
    const Add${capitalize(
      data.post_name
    )} = connect(mapStateToProps, {  save${capitalize(
      data.post_name
    )}, reset${capitalize(data.post_name)}  })(Add${capitalize(
      data.post_name
    )}Component);
    export { Add${capitalize(data.post_name)} };
    `;
    download(`Add${capitalize(data.post_name)}.js`, addPage);

    var updatePage = `
    import React from "react";
    import { Formik, Form } from "formik";
    import { connect } from "react-redux";
    // import { Link } from "react-router-dom";
    import { URL } from "../../redux/api/api.conf";
    import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


    import { NavBar } from "../../components";
    // import Select, { Option } from "rc-select";
    // import { Select as SelectDropDown } from "react-dropdown-select";
    import {
      CardBody,
      Alert,
      Button,
      Label,
      Input,
      Col,
      Row,
      Card,
      TabContent,
      TabPane,
      Badge,
      FormGroup,
    } from "reactstrap";
    import * as Yup from "yup";
    import Nav${capitalize(data.post_name)} from "./Nav${capitalize(
      data.post_name
    )}";

    import { get${capitalize(data.post_name)}ByID, update${capitalize(
      data.post_name
    )}ByID, delete${capitalize(data.post_name)}ByID, reset${capitalize(
      data.post_name
    )} } from "../../redux/config/";
    
    class Update${capitalize(data.post_name)}Component extends React.Component {
      state={
        ${data.post_name}Id: null,
        ${else_ele_state}
      }
      componentDidMount() {
        this.setState({ ${
          data.post_name
        }Id: escape(this.props.match.params.id) });
        this.props.get${capitalize(
          data.post_name
        )}ByID(this.props.match.params.id);
      }
    
      handleChangeFormik = (ele, value) => { this.setState({ [ele]: value, }); };
    
      _handleFormSubmit = (fromData, bag) => {
        let data = new FormData();
        data.append("file", this.state.${data.post_name}Img[0]);
        data.append("file_name", "avatar");
        data.set("${data.post_name}Name", fromData.${data.post_name}Name);
        this.props.update${capitalize(
          data.post_name
        )}ByID(this.props.match.params.id, data);
        this.bag = bag;
      };
      handle${capitalize(data.post_name)}Img = (${data.post_name}Img) => {
        this.setState({ ${data.post_name}Img });
      };
      joinedDate(type, v) {
        if (v) {
          if (type === "date") {
            const date = v.split("T")[0];
            return date;
          } else if (type === "time") {
            const time = v.split("T")[1].split(".")[0];
            return time;
          }
        }
        return v;
      }
    
      render() {
        const {
          
          getLoading${capitalize(data.post_name)},
          getSuccess${capitalize(data.post_name)},
          getFailed${capitalize(data.post_name)},

          updateLoading${capitalize(data.post_name)},
          updateSuccess${capitalize(data.post_name)},
          updateFailed${capitalize(data.post_name)},

          deleteLoading${capitalize(data.post_name)},
          deleteSuccess${capitalize(data.post_name)},
          deleteFailed${capitalize(data.post_name)},

        } = this.props

        return (
          <React.Fragment>
            <Card className="card-box mb-5">
              <Row className="no-gutters">
                <Col xl="12">
                  <Nav${capitalize(data.post_name)}
                    props={this.props}
                    taps={[
                      {
                        name: "الاقسام",
                        path: "/${data.post_name}s",
                        to: "/${data.post_name}s",
                      },
  
                      {
                        name: "منتجات القسم",
                        path: "/${data.post_name}/:id",
                        to: "/${data.post_name}/" + this.props.match.params.id,
                      },
                      {
                        name: "تعديل القسم",
                        path: "/${data.post_name}/update/:id",
                        to: "/${
                          data.post_name
                        }/update/" + this.props.match.params.id,
                      },
                      {
                        name: "أضافة منتج جديد",
                        path: "/${data.post_name}/add",
                        to: "/${data.post_name}/add",
                      },
                    ]}
                  />
                  <TabContent
                    className="p-4 pt-0"
                    activeTab={this.state.activeTab}
                  >
                    <TabPane className="active">
                      {(() => {
                        if (
                          this.props.getLoading${capitalize(data.post_name)} ||
                          this.props.updateLoading${capitalize(
                            data.post_name
                          )} ||
                          this.props.deleteLoading${capitalize(data.post_name)}
                        ) {
                          return (
                            <CardBody>
                            <SkeletonTheme color="#f0f0f0" highlightColor="#fff">
                              <p>
                                <Skeleton duration={1} />
                              </p>
                              <p>
                                <Skeleton duration={2} />
                              </p>
                              <p>
                                <Skeleton duration={3} />
                              </p>
                              <p className="mb-0">
                                <Skeleton duration={4} />
                              </p>
                            </SkeletonTheme>
                          </CardBody>
                          );
                        } else if (this.props.getSuccess${capitalize(
                          data.post_name
                        )}) {
                          return (
                            <Formik
                            enableReinitialize={true}
                            initialValues={{ ${else_ele_initialValues} }}
                            validationSchema={Yup.object().shape({ ${else_ele_Yup} })}
                            onSubmit={this._handleFormSubmit}
                          >
                            {({
                              handleSubmit,
                              isValid,
                              isSubmitting,
                              handleBlur,
                              errors,
                              touched,
                            }) => (
                              <Form>
                              ${else_ele_FormikContent}
                                <Button
                                  type="submit"
                                  color="neutral-info ml-2"
                                  onClick={handleSubmit}
                                  disabled={!isValid || isSubmitting}
                                >
                                  أضافة
                                </Button>
                              </Form>
                            )}
                          </Formik>
    
                          );
                        } else if (this.props.deleteSuccess${capitalize(
                          data.post_name
                        )}) {
                          return <Alert color="success">تم الحذف بنجاح</Alert>;
                        } else {
                          return (
                            <Alert color="danger">
                              غير موجود او ربما تم المسح
                            </Alert>
                          );
                        }
                      })()}{" "}
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Card>
        </React.Fragment>
        );
      }
    }
    
    const mapStateToProps = ({ ${data.post_name} }) => {
      return {

        getLoading${capitalize(data.post_name)}: ${
      data.post_name
    }.getLoading${capitalize(data.post_name)},
        getSuccess${capitalize(data.post_name)}: ${
      data.post_name
    }.getSuccess${capitalize(data.post_name)},
        getFailed${capitalize(data.post_name)}: ${
      data.post_name
    }.getFailed${capitalize(data.post_name)},

        updateLoading${capitalize(data.post_name)}: ${
      data.post_name
    }.updateLoading${capitalize(data.post_name)},
        updateSuccess${capitalize(data.post_name)}: ${
      data.post_name
    }.updateSuccess${capitalize(data.post_name)},
        updateFailed${capitalize(data.post_name)}: ${
      data.post_name
    }.updateFailed${capitalize(data.post_name)},

        deleteLoading${capitalize(data.post_name)}: ${
      data.post_name
    }.deleteLoading${capitalize(data.post_name)},
        deleteSuccess${capitalize(data.post_name)}: ${
      data.post_name
    }.deleteSuccess${capitalize(data.post_name)},
        deleteFailed${capitalize(data.post_name)}: ${
      data.post_name
    }.deleteFailed${capitalize(data.post_name)},

      };
    };
    
    const Update${capitalize(
      data.post_name
    )} = connect(mapStateToProps, {  get${capitalize(
      data.post_name
    )}ByID, update${capitalize(data.post_name)}ByID, delete${capitalize(
      data.post_name
    )}ByID, reset${capitalize(data.post_name)}  })(Update${capitalize(
      data.post_name
    )}Component);
    export { Update${capitalize(data.post_name)} };
    `;
    download(`Update${capitalize(data.post_name)}.js`, updatePage);
  });
  /*
  .########..########....###.....######..########
  .##.....##.##.........##.##...##....##....##...
  .##.....##.##........##...##..##..........##...
  .########..######...##.....##.##..........##...
  .##...##...##.......#########.##..........##...
  .##....##..##.......##.....##.##....##....##...
  .##.....##.########.##.....##..######.....##...
  */

  /*
  .########..########.########..##.....##.##.....##
  .##.....##.##.......##.....##.##.....##..##...##.
  .##.....##.##.......##.....##.##.....##...##.##..
  .########..######...##.....##.##.....##....###...
  .##...##...##.......##.....##.##.....##...##.##..
  .##....##..##.......##.....##.##.....##..##...##.
  .##.....##.########.########...#######..##.....##
  */
  $(document).on("click", ".generateReactRedux", function () {
    var data = {
      post_name: $(".post_name").val(),
    };

    reduxPage = `
    import {
      apiGetAll${capitalize(data.post_name)},
      apiDeleteAll${capitalize(data.post_name)},
      apiGet${capitalize(data.post_name)}ByID,
      apiSave${capitalize(data.post_name)},
      apiUpdate${capitalize(data.post_name)}ByID,
      apiDelete${capitalize(data.post_name)}ByID,
    } from "../api/";

    import { HandelMyError } from "../store/Redux.Hander.js";

    const ${data.post_name.toUpperCase()}_RESETALL = "GETALLSUCCESS${data.post_name.toUpperCase()}_RESETALL"

    const GETALLLOADING${data.post_name.toUpperCase()} = "GETALLLOADING${data.post_name.toUpperCase()}"
    const GETALLSUCCESS${data.post_name.toUpperCase()} = "GETALLSUCCESS${data.post_name.toUpperCase()}"
    const GETALLFAILED${data.post_name.toUpperCase()} = "GETALLFAILED${data.post_name.toUpperCase()}"

    const DELETEALLLOADING${data.post_name.toUpperCase()} = "DELETEALLLOADING${data.post_name.toUpperCase()}"
    const DELETEALLSUCCESS${data.post_name.toUpperCase()} = "DELETEALLSUCCESS${data.post_name.toUpperCase()}"
    const DELETEALLFAILED${data.post_name.toUpperCase()} = "DELETEALLFAILED${data.post_name.toUpperCase()}"

    const GETLOADING${data.post_name.toUpperCase()} = "GETLOADING${data.post_name.toUpperCase()}"
    const GETSUCCESS${data.post_name.toUpperCase()} = "GETSUCCESS${data.post_name.toUpperCase()}"
    const GETFAILED${data.post_name.toUpperCase()} = "GETFAILED${data.post_name.toUpperCase()}"

    const GETLOADING${data.post_name.toUpperCase()} = "GETLOADING${data.post_name.toUpperCase()}"
    const GETSUCCESS${data.post_name.toUpperCase()} = "GETSUCCESS${data.post_name.toUpperCase()}"
    const GETFAILED${data.post_name.toUpperCase()} = "GETFAILED${data.post_name.toUpperCase()}"

    const SAVELOADING${data.post_name.toUpperCase()} = "SAVELOADING${data.post_name.toUpperCase()}"
    const SAVESUCCESS${data.post_name.toUpperCase()} = "SAVESUCCESS${data.post_name.toUpperCase()}"
    const SAVEFAILED${data.post_name.toUpperCase()} = "SAVEFAILED${data.post_name.toUpperCase()}"

    const UPDATELOADING${data.post_name.toUpperCase()} = "UPDATELOADING${data.post_name.toUpperCase()}"
    const UPDATESUCCESS${data.post_name.toUpperCase()} = "UPDATESUCCESS${data.post_name.toUpperCase()}"
    const UPDATEFAILED${data.post_name.toUpperCase()} = "UPDATEFAILED${data.post_name.toUpperCase()}"

    const DELETELOADING${data.post_name.toUpperCase()} = "DELETELOADING${data.post_name.toUpperCase()}"
    const DELETESUCCESS${data.post_name.toUpperCase()} = "DELETESUCCESS${data.post_name.toUpperCase()}"
    const DELETEFAILED${data.post_name.toUpperCase()} = "DELETEFAILED${data.post_name.toUpperCase()}"

    export const resetAll${capitalize(data.post_name)} = () => {
      return (dispatch) => {
        dispatch({ type: ${data.post_name.toUpperCase()}_RESETALL });
      };
    };

    export const getAll${capitalize(data.post_name)} = () => {
      return async (dispatch) => {
        try {
          dispatch({ type: ${data.post_name.toUpperCase()}_RESETALL });
          dispatch({ type: GETALLLOADING${data.post_name.toUpperCase()} });
          const {data :{${data.post_name}s}} = await apiGetAll${capitalize( data.post_name )}();
          dispatch({ type: GETALLSUCCESS${data.post_name.toUpperCase()}, payload: {${ data.post_name }s} });
        } catch (e) {
          dispatch({ type: GETALLFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };
    export const deleteAll${capitalize(data.post_name)} = (id) => {
      return async (dispatch) => {
        try {
          dispatch({ type: ${data.post_name.toUpperCase()}_RESETALL });
          dispatch({ type: DELETEALLLOADING${data.post_name.toUpperCase()} });
          const {data : { success }} = await apiDeleteAll${capitalize( data.post_name )}();
          dispatch({ type: DELETEALLSUCCESS${data.post_name.toUpperCase()} , payload: success });
        } catch (e) {
          dispatch({ type: DELETEALLFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };

    export const get${capitalize(data.post_name)}ByID = (id) => {
      return async (dispatch) => {
        try {
          dispatch({ type: ${data.post_name.toUpperCase()}_RESETALL });
          dispatch({ type: GETLOADING${data.post_name.toUpperCase()} });
          const { data :{${data.post_name}}} = await apiGet${capitalize( data.post_name )}ByID(id);
          dispatch({ type: GETSUCCESS${data.post_name.toUpperCase()}, payload: {${ data.post_name }} });
        } catch (e) {
          dispatch({ type: GETFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };
    
    export const save${capitalize(data.post_name)} = (${data.post_name}) => {
      return async (dispatch) => {
        try {
          dispatch({ type: SAVELOADING${data.post_name.toUpperCase()} });
          const {data : { success }} = await apiSave${capitalize( data.post_name )}(${data.post_name});
          dispatch({ type: SAVESUCCESS${data.post_name.toUpperCase()}  , payload: success});
        } catch (e) {
          dispatch({ type: SAVEFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e)});
        }
        try {
          dispatch({ type: GETLOADING${data.post_name.toUpperCase()} });
          const { data : {${data.post_name}} } = await apiGet${capitalize( data.post_name )}ByID(id);
          dispatch({ type: GETSUCCESS${data.post_name.toUpperCase()}, payload: {${ data.post_name }} });
        } catch (e) {
          dispatch({ type: GETFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };
    
    export const update${capitalize(data.post_name)}ByID = (id, data) => {
      return async (dispatch) => {
        try {
          dispatch({ type: UPDATELOADING${data.post_name.toUpperCase()} });
          const { data : { success }} = await apiUpdate${capitalize( data.post_name )}ByID(id, data);
          dispatch({ type: UPDATESUCCESS${data.post_name.toUpperCase()}, payload: success });    
        } catch (e) {
          dispatch({ type: UPDATEFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });    
        }
        try {
          dispatch({ type: GETLOADING${data.post_name.toUpperCase()} });
          const { data : {${data.post_name}} } = await apiGet${capitalize( data.post_name )}ByID(id);
          dispatch({ type: GETSUCCESS${data.post_name.toUpperCase()}, payload: {${ data.post_name }} });
        } catch (e) {
          dispatch({ type: GETFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };
    
    export const delete${capitalize(data.post_name)}ByID = (id) => {
      return async (dispatch) => {
        try {
          dispatch({ type: ${data.post_name.toUpperCase()}_RESETALL });
          dispatch({ type: DELETELOADING${data.post_name.toUpperCase()} });
          const { data : { success }} = await apiDelete${capitalize( data.post_name )}ByID(id);
          dispatch({ type: DELETESUCCESS${data.post_name.toUpperCase()} , payload: success});
        } catch (e) {
          dispatch({ type: DELETEFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
        try {
          dispatch({ type: GETLOADING${data.post_name.toUpperCase()} });
          const { data : {${data.post_name}} } = await apiGet${capitalize( data.post_name )}ByID(id);
          dispatch({ type: GETSUCCESS${data.post_name.toUpperCase()}, payload: {${ data.post_name }} });
        } catch (e) {
          dispatch({ type: GETFAILED${data.post_name.toUpperCase()}, payload: HandelMyError(e) });
        }
      };
    };
    
    const INITIAL_STATE = {
      getAllLoading${capitalize(data.post_name)}: false,
      getAllSuccess${capitalize(data.post_name)}: null,
      getAllFailed${capitalize(data.post_name)}: null,

      deleteAllLoading${capitalize(data.post_name)}: false,
      deleteAllSuccess${capitalize(data.post_name)}: null,
      deleteAllFailed${capitalize(data.post_name)}: null,

      getLoading${capitalize(data.post_name)}: false,
      getSuccess${capitalize(data.post_name)}:null,
      getFailed${capitalize(data.post_name)}: null,

      saveLoading${capitalize(data.post_name)}: false,
      saveSuccess${capitalize(data.post_name)}: null,
      saveFailed${capitalize(data.post_name)}: null,

      updateLoading${capitalize(data.post_name)}: false,
      updateSuccess${capitalize(data.post_name)}: null,
      updateFailed${capitalize(data.post_name)}: null,

      deleteLoading${capitalize(data.post_name)}: false,
      deleteSuccess${capitalize(data.post_name)}: null,
      deleteFailed${capitalize(data.post_name)}: null,

    };

    export default (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case ${data.post_name.toUpperCase()}_RESETALL: return { 
          ...state, 
          getAllLoading${capitalize(data.post_name)}: false, 
          getAllSuccess${capitalize(data.post_name)}: null, 
          getAllFailed${capitalize(data.post_name)}: null,

          deleteAllLoading${capitalize(data.post_name)}: false, 
          deleteAllSuccess${capitalize(data.post_name)}: null, 
          deleteAllFailed${capitalize(data.post_name)}: null,

          getLoading${capitalize(data.post_name)}: false, 
          getSuccess${capitalize(data.post_name)}: null, 
          getFailed${capitalize(data.post_name)}: null,

          saveLoading${capitalize(data.post_name)}: false, 
          saveSuccess${capitalize(data.post_name)}: null, 
          saveFailed${capitalize(data.post_name)}: null,

          updateLoading${capitalize(data.post_name)}: false, 
          updateSuccess${capitalize(data.post_name)}: null, 
          updateFailed${capitalize(data.post_name)}: null,

          deleteLoading${capitalize(data.post_name)}: false, 
          deleteSuccess${capitalize(data.post_name)}: null, 
          deleteFailed${capitalize(data.post_name)}: null,
        };

        case GETALLLOADING${data.post_name.toUpperCase()}: return { ...state, getAllLoading${capitalize( data.post_name )}: true, getAllSuccess${capitalize( data.post_name )}: null, getAllFailed${capitalize(data.post_name)}: null };
        case GETALLSUCCESS${data.post_name.toUpperCase()}: return { ...state, getAllLoading${capitalize(data.post_name)}: false, getAllSuccess${capitalize(data.post_name)}: action.payload || {}, getAllFailed${capitalize(data.post_name)}: null };
        case GETALLFAILED${data.post_name.toUpperCase()}:  return { ...state, getAllLoading${capitalize(data.post_name)}: false, getAllSuccess${capitalize(data.post_name)}: null, getAllFailed${capitalize(data.post_name)}: action.payload || "" };
        
        case DELETEALLLOADING${data.post_name.toUpperCase()}: return { ...state, deleteAllLoading${capitalize(data.post_name)}: true, deleteAllSuccess${capitalize(data.post_name)}: null, deleteAllFailed${capitalize(data.post_name)}: null };
        case DELETEALLSUCCESS${data.post_name.toUpperCase()}: return { ...state, deleteAllLoading${capitalize(data.post_name)}: false, deleteAllSuccess${capitalize(data.post_name)}: action.payload || "", deleteAllFailed${capitalize(data.post_name)}: null };
        case DELETEALLFAILED${data.post_name.toUpperCase()}:  return { ...state, deleteAllLoading${capitalize(data.post_name)}: false, deleteAllSuccess${capitalize(data.post_name)}: null, deleteAllFailed${capitalize(data.post_name)}: action.payload || "" };
        
        case GETLOADING${data.post_name.toUpperCase()}: return { ...state, getLoading${capitalize(data.post_name)}: true, getSuccess${capitalize(data.post_name)}: null, getFailed${capitalize(data.post_name)}: null };
        case GETSUCCESS${data.post_name.toUpperCase()}: return { ...state, getLoading${capitalize(data.post_name)}: false, getSuccess${capitalize(data.post_name)}: action.payload || {}, getFailed${capitalize(data.post_name)}: null };
        case GETFAILED${data.post_name.toUpperCase()}:  return { ...state, getLoading${capitalize(data.post_name)}: false, getSuccess${capitalize(data.post_name)}: null, getFailed${capitalize(data.post_name)}: action.payload || "" };

        case SAVELOADING${data.post_name.toUpperCase()}: return { ...state, saveLoading${capitalize(data.post_name)}: true, saveSuccess${capitalize(data.post_name)}: null, saveFailed${capitalize(data.post_name)}: null };
        case SAVESUCCESS${data.post_name.toUpperCase()}: return { ...state, saveLoading${capitalize(data.post_name)}: false, saveSuccess${capitalize(data.post_name)}: action.payload || "", saveFailed${capitalize(data.post_name)}: null };
        case SAVEFAILED${data.post_name.toUpperCase()}:  return { ...state, saveLoading${capitalize(data.post_name)}: false, saveSuccess${capitalize(data.post_name)}: null, saveFailed${capitalize(data.post_name)}: action.payload || "" };

        case UPDATELOADING${data.post_name.toUpperCase()}: return { ...state, updateLoading${capitalize(data.post_name)}: true, updateSuccess${capitalize(data.post_name)}: null, updateFailed${capitalize(data.post_name)}: null };
        case UPDATESUCCESS${data.post_name.toUpperCase()}: return { ...state, updateLoading${capitalize(data.post_name)}: false, updateSuccess${capitalize(data.post_name)}: action.payload || "", updateFailed${capitalize(data.post_name)}: null };
        case UPDATEFAILED${data.post_name.toUpperCase()}:  return { ...state, updateLoading${capitalize(data.post_name)}: false, updateSuccess${capitalize(data.post_name)}: null, updateFailed${capitalize(data.post_name)}: action.payload || "" };

        case DELETELOADING${data.post_name.toUpperCase()}: return { ...state, deleteLoading${capitalize(data.post_name)}: true, deleteSuccess${capitalize(data.post_name)}: null, deleteFailed${capitalize(data.post_name)}: null };
        case DELETESUCCESS${data.post_name.toUpperCase()}: return { ...state, deleteLoading${capitalize(data.post_name)}: false, deleteSuccess${capitalize(data.post_name)}: action.payload || "" , deleteFailed${capitalize(data.post_name)}: null };
        case DELETEFAILED${data.post_name.toUpperCase()}:  return { ...state, deleteLoading${capitalize(data.post_name)}: false, deleteSuccess${capitalize(data.post_name)}: null, deleteFailed${capitalize(data.post_name)}: action.payload || "" };

        default: return state;
      }
    };

    `;

    download(`${data.post_name}.redux.js`, reduxPage);

    // Api
    apiPage = `
      import axios from "axios";
      import { URL } from "./api.conf";

      export const apiGetAll${capitalize(data.post_name)} = () => {
        return axios.get(URL+"/${data.post_name}");
      };
      export const apiDeleteAll${capitalize(data.post_name)} = () => {
        return axios.delete(URL+"/${data.post_name}/");
      };

      export const apiGet${capitalize(data.post_name)}ByID = (id) => {
        return axios.get(URL+"/${data.post_name}/" + id);
      };

      export const apiUpdate${capitalize(data.post_name)}ByID = (id, ${data.post_name}) => {
        return axios.put(URL+"/${data.post_name}/" + id, ${data.post_name});
      };

      export const apiSave${capitalize(data.post_name)} = (${data.post_name}) => {
        return axios.post(URL+"/${data.post_name}", ${data.post_name});
      };

      export const apiDelete${capitalize(data.post_name)}ByID = (id) => {
        return axios.delete(URL+"/${data.post_name}/" + id);
      };

    `;
    download(`${data.post_name}.api.js`, apiPage);
  });
  /*
  .########.##.....##.########..########..########..######...######.
  .##........##...##..##.....##.##.....##.##.......##....##.##....##
  .##.........##.##...##.....##.##.....##.##.......##.......##......
  .######......###....########..########..######....######...######.
  .##.........##.##...##........##...##...##.............##.......##
  .##........##...##..##........##....##..##.......##....##.##....##
  .########.##.....##.##........##.....##.########..######...######.
  */

  $(document).on("click", ".generateExpress", function () {
    $(".resultExpress").slideDown();
    ele_length = $(".row_data .one_row").length;
    var data = {
      post_name: $(".post_name").val(),
      elements: [],
    };
    for (let index = 0; index < ele_length; index++) {
      var ele = [
        $(".row_data .one_row").eq(index).find(".key_name").val(),
        $(".row_data .one_row").eq(index).find(".key_type").val(),
        $(".row_data .one_row").eq(index).find(".key_priority").val(),
      ];
      data.elements.push(ele);
    }

    function dataTypes(type, section) {
      if (section == "router") {
        if (type[0] == "string") {
          return `${
            type[1] !== "required" ? ".optional({ checkFalsy: true })" : ""
          }.isByteLength({ min: 1 })`;
        } else if (type[0] == "email") {
          return `${
            type[1] !== "required" ? ".optional({ checkFalsy: true })" : ""
          }.isEmail({ min: 1 }).normalizeEmail()`;
        } else if (type[0] == "number") {
          return `${
            type[1] !== "required" ? ".optional({ checkFalsy: true })" : ""
          }.isInt()`;
        } else if (type[0] == "phone") {
          return `${
            type[1] !== "required" ? "..optional({ checkFalsy: true })" : ""
          }.isMobilePhone()`;
        } else if (type[0] == "boolean") {
          return `${
            type[1] !== "required" ? ".optional({ checkFalsy: true })" : ""
          }.isBoolean()`;
        } else if (type[0] == "date") {
          return `${
            type[1] !== "required" ? ".optional({ checkFalsy: true })" : ""
          }.isDate()`;
        } else {
          return "false";
        }
      } else if (section == "module") {
        if (type[0] == "string") {
          return `type: String,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else if (type[0] == "email") {
          return `type: String,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else if (type[0] == "number") {
          return `type: Number,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else if (type[0] == "phone") {
          return `type: Number,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else if (type[0] == "boolean") {
          return `type: Boolean,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else if (type[0] == "date") {
          return `type: Date,
          ${type[1] === "required" ? "required: true" : ""}`;
        } else {
          return "false";
        }
      }
    }
    // Insert Data
    // append in router
    /*
    .########...#######..##.....##.########.########.########.
    .##.....##.##.....##.##.....##....##....##.......##.....##
    .##.....##.##.....##.##.....##....##....##.......##.....##
    .########..##.....##.##.....##....##....######...########.
    .##...##...##.....##.##.....##....##....##.......##...##..
    .##....##..##.....##.##.....##....##....##.......##....##.
    .##.....##..#######...#######.....##....########.##.....##
    */
    var else_ele_router = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_router += `check("${data.post_name}${capitalize(
        data.elements[index][0]
      )}")${dataTypes(
        [data.elements[index][1], data.elements[index][2]],
        "router"
      )},`;
    }

    $("#rourer_result").html(`
    const ${data.post_name}sController = require("../src/controllers/${data.post_name}.c");

    router.get(
      "/${data.post_name}",
      ${data.post_name}sController.getAll
    );
    router.delete(
      "/${data.post_name}",
      ${data.post_name}sController.deleteAll
    );
    router.get(
      "/${data.post_name}/:${data.post_name}Id",
      param("${data.post_name}Id").isByteLength({ min: 10 }),
      (req, res, next) => badValidation(req, res, next),
      ${data.post_name}sController.get
    );
    
    router.post(
      "/${data.post_name}",
      ${else_ele_router}
      (req, res, next) => badValidation(req, res, next),
      ${data.post_name}sController.add
    );
    
    router.put(
      "/${data.post_name}/:${data.post_name}Id",
      param("${data.post_name}Id").isByteLength({ min: 10 }),
      ${else_ele_router}
      (req, res, next) => badValidation(req, res, next),
      ${data.post_name}sController.update
    );
    router.delete(
      "/${data.post_name}/:${data.post_name}Id",
      param("${data.post_name}Id").isByteLength({ min: 10 }),
      (req, res, next) => badValidation(req, res, next),
      ${data.post_name}sController.delete
    );
    
    `);

    // append in Controller
    /*
    ..######...#######..##....##.########.########...#######..##.......##.......########.########.
    .##....##.##.....##.###...##....##....##.....##.##.....##.##.......##.......##.......##.....##
    .##.......##.....##.####..##....##....##.....##.##.....##.##.......##.......##.......##.....##
    .##.......##.....##.##.##.##....##....########..##.....##.##.......##.......######...########.
    .##.......##.....##.##..####....##....##...##...##.....##.##.......##.......##.......##...##..
    .##....##.##.....##.##...###....##....##....##..##.....##.##.......##.......##.......##....##.
    ..######...#######..##....##....##....##.....##..#######..########.########.########.##.....##
    */
    var else_ele_Controller = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_Controller += `${data.post_name}${capitalize(
        data.elements[index][0]
      )},`;
    }
    var ControllerFileData = `
    const ${capitalize(data.post_name)} = require("../models/${data.post_name}.m");
    const ${data.post_name}sController = {};
    // ${capitalize(data.post_name)}

    ${data.post_name}sController.getAll = async (req, res, next) => {
      const { user } = req;
      try {
        const ${data.post_name}s = await ${capitalize(data.post_name)}.find({ userId: user._id });
        if (${data.post_name}s !== null) {
          return res.status(200).send({
            ${data.post_name}s,
          });
        }
        return res.status(404).send({error :"غير موجود او ربما تم المسح"});
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };

    ${data.post_name}sController.deleteAll = async (req, res, next) => {
      const userId = req.user._id;
      try {
        await ${capitalize(data.post_name)}.delete({
          userId: userId,
        });
        return res.status(200).send({ success: "تم الحذف الكل" });
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };

    ${data.post_name}sController.get = async (req, res, next) => {
      const { user } = req;
      try {
        const ${data.post_name} = await ${capitalize(data.post_name)}.findOne({
          userId: user._id,
          _id: req.params.${data.post_name}Id,
        });
        if (${data.post_name} !== null) {
          return res.status(200).send({${data.post_name}});
        }
        return res.status(404).send({error :"غير موجود او ربما تم المسح"});
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };

    ${data.post_name}sController.add = async (req, res, next) => {
      const { ${else_ele_Controller} } = req.body;
      const new${capitalize(data.post_name)} = new ${capitalize(data.post_name)}({userId: req.user._id,${else_ele_Controller}  });
      try {
        await new${capitalize(data.post_name)}.save();
        return res.status(200).send({success :"تم الحفظ بنجاح"});
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };

    ${data.post_name}sController.update = async (req, res, next) => {
      const { ${else_ele_Controller} } = req.body;
      updateData = {
        ${else_ele_Controller}
      };

      // if (sectionName !== undefined && sectionName !== "") {
      //   updateData["sectionName"] = sectionName;
      // }
    
      // if (Array.isArray(req.files) && req.files.length) {
      //   updateData["sectionImg"] = req.files[0].filename;
      // }

      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(401).send({
          error: "لايوجد شي للتعديل",
        });
      }
    
      try {
        await ${capitalize(data.post_name)}.updateOne({ _id: req.params.${data.post_name}Id, userId: req.user._id },updateData,{ upsert: false });
        return res.status(200).send({success :"تم التعديل بنجاح"});
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };
    
    ${data.post_name}sController.delete = async (req, res, next) => {
      const userId = req.user._id;
      const ${data.post_name}Id = req.params.${data.post_name}Id;
      try {
        await ${capitalize(data.post_name)}.deleteOne({
          _id: ${capitalize(data.post_name)}Id,
          userId: userId,
        });
        return res.status(200).send({ success :"تم الحذف بنجاح" });
      } catch (e) {
        return res.status(400).send({error :e});
      }
    };

    module.exports = ${data.post_name}sController;`;
    download(`${data.post_name}.c.js`, ControllerFileData);

    // // append in module
    /*
    .##.....##..#######..########..##.....##.##.......########
    .###...###.##.....##.##.....##.##.....##.##.......##......
    .####.####.##.....##.##.....##.##.....##.##.......##......
    .##.###.##.##.....##.##.....##.##.....##.##.......######..
    .##.....##.##.....##.##.....##.##.....##.##.......##......
    .##.....##.##.....##.##.....##.##.....##.##.......##......
    .##.....##..#######..########...#######..########.########
    */
    var else_ele_Module = "";
    for (let index = 0; index < data.elements.length; index++) {
      else_ele_Module += `${data.post_name}${capitalize(
        data.elements[index][0]
      )} : {${dataTypes(
        [data.elements[index][1], data.elements[index][2]],
        "module"
      )}},`;
    }

    var ModuleFileDta = `
    const mongoose = require("mongoose");
    const { Schema } = mongoose;
      const ${capitalize(data.post_name)}Schema = Schema(
      {
        userId: { type: String, required: true },
        ${else_ele_Module}
      },
      {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Date.now() },
      }
    );

    const ${capitalize(data.post_name)} = mongoose.model("${capitalize(data.post_name)}", ${capitalize(data.post_name)}Schema);
    module.exports = ${capitalize(data.post_name)};

    `;
    download(`${data.post_name}.m.js`, ModuleFileDta);
  });

  $(document).on("click", ".delete_row", function () {
    $(this).parents(".one_row").remove();
  });

  $(document).on("click", ".copy_content", function () {
    var $tempElement = $("<input>");
    $("body").append($tempElement);
    curr_content = $(this).text();
    $tempElement.val(curr_content).select();
    document.execCommand("Copy");
    $tempElement.remove();
  });
  $(window).keypress(function (e) {
    if (event.keyCode === 13) {
      $(".add_new").click();
      $(".key_name").last().focus();
    }
  });
  $(window).keypress(function (e) {
    if (event.keyCode === 10) {
      $(".generateExpress").click();
    }
  });
});
