import { useState } from "react";
import {
  Button,
  Modal,
  MyForm,
  SearchBox,
  SelectBox,
  Table,
} from "../../../components";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { getCompanies } from "../../../redux/actions/company";
import { getCompanyProjects } from "../../../redux/actions/company-project";
import { getCompanyPositions } from "../../../redux/actions/company-position";
import { getCandidates } from "../../../redux/actions/candidate";
import { getAllCandidatePositionStatus } from "../../../redux/actions/settings/candidate-position-status";
import {
  changeStatusCandidatePosition,
  createCandidatePosition,
} from "../../../redux/actions/candidate-position";
import { getCountries } from "../../../redux/actions/settings/country";
import { convertArrayToSelectOptions } from "../../../helpers/convert-array-to-select-options";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CreateCandidate } from "./form/candidate";
import { ChangeStatus } from "./form/status";
import { CgExpand } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import { TbArrowBackUp } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

export const Candidate = () => {
  // ----------- store ------------
  const {
    info: { data: companyData },
    loading: companyLoading,
  } = useSelector((state) => state.companySlice);
  const {
    info: { data: companyProjectData },
    loading: companyProjectLoading,
  } = useSelector((state) => state.companyProjectSlice);
  const {
    info: { data: companyPositionData },
    loading: companyPositionLoading,
  } = useSelector((state) => state.companyPositionSlice);
  const {
    info: { data: candidateData },
    loading: candidateLoading,
  } = useSelector((state) => state.candidateSlice);
  const {
    info: { data: candidatePositionStatusData },
  } = useSelector((state) => state.candidatePositionStatusSlice);
  const {
    info: { data: countryData },
  } = useSelector((state) => state.countrySlice);

  // ----------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const searchFilterData = {
    companyId: null,
    companyProjectId: null,
    companyPositionId: null,
  };
  const colsPrecandidate = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Family",
      selector: (row) => row.family,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`rounded-lg p-3 ${
            row.candidateGroup === 1
              ? "text-custom-yellow-dark bg-custom-yellow-light"
              : row.candidateGroup === 2
              ? "text-custom-purple-dark bg-custom-purple-light"
              : row.candidateGroup === 3
              ? "text-custom-red-dark bg-custom-red-light"
              : row.candidateGroup === 4
              ? "text-custom-green-dark bg-custom-green-light"
              : "text-black bg-gray-300"
          }`}
        >
          {row.candidatePositionStatus.title}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <span
            className="flex text-[#7E8299] bg-[#F1F1F2] p-2 rounded-md cursor-pointer text-14"
            onClick={() => statusClickHandler(row.id)}
          >
            Actions
            <span
              className={`my-auto ml-2 ease-in duration-300 ${
                statusIndex === row.id && "rotate-180"
              }`}
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.92639 5.49304C4.83865 5.49355 4.75168 5.47673 4.67045 5.44356C4.58923 5.41038 4.51535 5.3615 4.45306 5.29971L0.453058 1.29971C0.390573 1.23773 0.340977 1.164 0.307131 1.08276C0.273285 1.00152 0.255859 0.914383 0.255859 0.826375C0.255859 0.738367 0.273285 0.65123 0.307131 0.56999C0.340977 0.488751 0.390573 0.415017 0.453058 0.353041C0.577967 0.228874 0.746935 0.15918 0.923059 0.15918C1.09918 0.15918 1.26815 0.228874 1.39306 0.353041L4.92639 3.88637L8.45306 0.353041C8.57797 0.228874 8.74693 0.15918 8.92306 0.15918C9.09918 0.15918 9.26815 0.228874 9.39306 0.353041C9.45554 0.415017 9.50514 0.488751 9.53899 0.56999C9.57283 0.65123 9.59026 0.738367 9.59026 0.826375C9.59026 0.914383 9.57283 1.00152 9.53899 1.08276C9.50514 1.164 9.45554 1.23773 9.39306 1.29971L5.39306 5.29971C5.26888 5.42287 5.10129 5.4923 4.92639 5.49304Z"
                  fill="#7E8299"
                />
              </svg>
            </span>
          </span>
          {/* Popup menu start */}
          <div
            className={`flex flex-col gap-y-2 duration-200 ease-in-out bg-white shadow-md py-3 px-4 z-40 text-sm border absolute right-18 top-12 rounded-md ${
              statusIndex === row.id
                ? "visible opacity-100 translate-y-0"
                : "translate-y-6 opacity-0 invisible"
            }`}
          >
            <span className="flex">
              <TiTick color="#22c55e" size={18} className="-ml-2" />
              <span className="cursor-pointer text-green-500">CV reviewed</span>
            </span>
            <span className="cursor-pointer">HR interview</span>
            <span className="cursor-pointer">Technical interview</span>
          </div>
          {/* Popup menu end */}
        </>
      ),
    },
  ];

  // ----------- state ------------
  const [statusIndex, setIsStatusIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [reFetchData, setReFetchData] = useState(false);
  const [infoModal, setInfoModal] = useState({
    type: "",
    data: "",
  });
  const [isActiveCards, setIsActiveCards] = useState(false);
  const [companyPositionId, setCompanyPositionId] = useState();
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: t("card.pre_candidate"),
      data: [],
      cols: colsPrecandidate,
    },
    {
      id: "2",
      title: t("card.candidate"),
      data: [],
      cols: colsPrecandidate,
    },
    {
      id: "3",
      title: t("card.rejected"),
      data: [],
      cols: colsPrecandidate,
    },
    {
      id: "4",
      title: t("card.employee"),
      data: [],
      cols: colsPrecandidate,
    },
    {
      id: "5",
      title: t("card.quitted"),
      data: [],
      cols: colsPrecandidate,
    },
  ]);
  const [columnId, setColumnId] = useState();
  const [selectOptions, setSelectOptions] = useState({
    company: [],
    companyProject: [],
    companyPosition: [],
  });

  // ----------- function ----------
  const statusClickHandler = (index) => {
    statusIndex !== index ? setIsStatusIndex(+index) : setIsStatusIndex(null);
  };
  const handleOnDragEnd = (result) => {
    let params;
    const droppableId = result.source.droppableId;
    const index = result.source.index;
    const item = columns[droppableId].data[index];
    if (
      (result.source.droppableId == 0 && result.destination.droppableId == 1) ||
      (result.source.droppableId == 2 && result.destination.droppableId == 1) ||
      (result.source.droppableId == 4 && result.destination.droppableId == 1)
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 7,
      };
    } else if (
      (result.source.droppableId == 1 && result.destination.droppableId == 0) ||
      (result.source.droppableId == 2 && result.destination.droppableId == 0) ||
      (result.source.droppableId == 4 && result.destination.droppableId == 0)
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 1,
      };
    } else if (
      (result.source.droppableId == 0 && result.destination.droppableId == 2) ||
      (result.source.droppableId == 1 && result.destination.droppableId == 2) ||
      (result.source.droppableId == 1 && result.destination.droppableId == 3)
    ) {
      handleOpenModal("changeStatus", item);
    } else if (
      result.source.droppableId == 3 &&
      result.destination.droppableId == 4
    ) {
      params = {
        candidatePositionId: item.candidatePositionId,
        candidatePositionStatusId: 29,
      };
    }
    if (params) {
      dispatch(
        changeStatusCandidatePosition(params, (status) =>
          setReFetchData(status)
        )
      );
    }
  };
  const handleChangeSelect = (title, property, id) => {
    const options = {
      pageNumber: 0,
      pageSize: 0,
      filters: [
        {
          property: property,
          operation: 5,
          values: [`${id}`],
        },
      ],
    };
    if (title === "company") {
      dispatch(getCompanyProjects(options));
    } else if (title === "companyProject") {
      dispatch(getCompanyPositions(options));
    }
  };
  const handleOpenModal = (type, data) => {
    setOpenModal(true);
    setInfoModal({
      type,
      data,
    });
  };
  const handleFilteredSearch = (id, value, dataList) => {
    const itemIndex = columns.findIndex((item) => item.id == id);
    const item = columns[itemIndex];
    const updateItem = {
      ...item,
      data: dataList.filter((item) => item.name.toLowerCase().includes(value)),
    };
    const newColumns = [...columns];
    newColumns[itemIndex] = updateItem;
    setColumns(newColumns);
  };
  const handleCompanyPositionSelect = (selected) => {
    setCompanyPositionId(selected.value);
    if (selected.value) {
      dispatch(getCandidates({ companyPositionId: selected.value }));
      setIsActiveCards(true);
    }
  };
  const handleChangeStatus = (item) => {
    let params = {
      candidatePositionId: item.candidatePositionId,
      candidatePositionStatusId: item.candidatePositionStatus.parentId,
    };
    dispatch(
      changeStatusCandidatePosition(params, (status) => setReFetchData(status))
    );
  };

  // ----------- lifeCycles ----------
  useEffect(() => {
    const options = {
      pageNumber: 0,
      pageSize: 0,
      filters: [
        {
          property: "TenantId",
          operation: 5,
          values: [getDataFromJwtToken("TenantId")],
        },
      ],
    };
    dispatch(getCountries({}));
    dispatch(getCompanies(options));
    isActiveCards && dispatch(getAllCandidatePositionStatus({}));
    isActiveCards &&
      dispatch(
        getCandidates({
          pageNumber: 0,
          pageSize: 0,
          filters: [],
          orderBy: "",
          includeProperties: "",
          companyPositionId: companyPositionId,
        })
      );
  }, [isActiveCards]);
  useEffect(() => {
    if (reFetchData) {
      dispatch(
        getCandidates({
          pageNumber: 0,
          pageSize: 0,
          filters: [],
          orderBy: "",
          includeProperties: "",
          companyPositionId: companyPositionId,
        })
      );
      setReFetchData(false);
    }
  }, [reFetchData]);
  useEffect(() => {
    if (candidateData?.length) {
      const findPreCandidate = columns.find((item) => item.id === "1");
      const findCandidate = columns.find((item) => item.id === "2");
      const findRejected = columns.find((item) => item.id === "3");
      const findEmployee = columns.find((item) => item.id === "4");
      const findQuitted = columns.find((item) => item.id === "5");
      const filterPrecandidate = candidateData.filter(
        (item) => item.candidateGroup === 1
      );
      const filterCandidate = candidateData.filter(
        (item) => item.candidateGroup === 2
      );
      const filteredRejected = candidateData.filter(
        (item) => item.candidateGroup === 3
      );
      const filteredEmployee = candidateData.filter(
        (item) => item.candidateGroup === 4
      );
      const filteredQuitted = candidateData.filter(
        (item) => item.candidateGroup === 5
      );
      findPreCandidate.data = filterPrecandidate;
      findCandidate.data = filterCandidate;
      findRejected.data = filteredRejected;
      findEmployee.data = filteredEmployee;
      findQuitted.data = filteredQuitted;
      setColumns([...columns]);
    }
  }, [candidateData, candidateLoading]);
  useEffect(() => {
    if (companyData) {
      const options = convertArrayToSelectOptions(companyData, ["id", "title"]);
      setSelectOptions((prevState) => ({
        ...prevState,
        company: options,
      }));
    }
  }, [companyData]);
  useEffect(() => {
    if (companyProjectData) {
      const options = convertArrayToSelectOptions(companyProjectData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyProject: options,
      }));
    } else {
      setSelectOptions((prevState) => ({
        ...prevState,
        companyProject: [],
      }));
    }
  }, [companyProjectData]);
  useEffect(() => {
    if (companyPositionData) {
      const options = convertArrayToSelectOptions(companyPositionData, [
        "id",
        "title",
      ]);
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPosition: options,
      }));
    } else {
      setSelectOptions((prevState) => ({
        ...prevState,
        companyPosition: [],
      }));
    }
  }, [companyPositionData]);

  // ----------- render JSX -------------
  return (
    <>
      <Modal state={openModal} onCloseModal={setOpenModal}>
        {infoModal.type === "createCandidate" && (
          <CreateCandidate
            onCloseModal={() => setOpenModal(false)}
            companyPositionId={companyPositionId}
            countries={
              countryData && countryData.map((country) => country.countryCode)
            }
          />
        )}
        {infoModal.type === "changeStatus" && (
          <ChangeStatus
            onCloseModal={() => setOpenModal(false)}
            reFetchData={() => setReFetchData((prevState) => !prevState)}
            statusData={infoModal.data}
            candidatePositionStatus={candidatePositionStatusData}
          />
        )}
      </Modal>
      <div className="h-full flex flex-col">
        <div
          className={
            "flex font-semibold border-b-2 pb-2 mb-4 gap-x-4 select-none z-20"
          }
        >
          <MyForm initialValues={searchFilterData}>
            <div className="flex items-center gap-x-4">
              <Field
                component={SelectBox}
                placeholder={t("input.company.placeholder")}
                options={selectOptions.company}
                name="company"
                onChangeHandler={(data) =>
                  handleChangeSelect("company", "CompanyId", data.value)
                }
                loading={companyLoading}
              />
              <Field
                component={SelectBox}
                placeholder={t("input.company_project.placeholder")}
                options={selectOptions.companyProject}
                name="companyProject"
                onChangeHandler={(data) =>
                  handleChangeSelect(
                    "companyProject",
                    "CompanyProjectId",
                    data.value
                  )
                }
                loading={companyProjectLoading}
              />
              <Field
                component={SelectBox}
                placeholder={t("input.company_position.placeholder")}
                options={selectOptions.companyPosition}
                name="companyPosition"
                loading={companyPositionLoading}
                onChangeHandler={handleCompanyPositionSelect}
              />
              <Field
                component={SearchBox}
                placeholder={t("input.search.placeholder")}
                name="search"
              />
            </div>
          </MyForm>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="relative flex flex-col flex-grow overflow-y-hidden">
            {!isActiveCards && (
              <div className="absolute top-0 left-0 w-full h-full bg-custom-gray-light bg-opacity-70 backdrop-blur-[3px] z-10 rounded-md flex justify-center items-center">
                <p className="text-18">{t("text.select_company_position")}</p>
              </div>
            )}
            {candidateLoading && (
              <div className="absolute top-0 left-0 w-full h-full bg-custom-gray-light bg-opacity-70 backdrop-blur-[3px] z-10 rounded-md flex justify-center items-center">
                <ClipLoader color="#FE6601" className="w-full mx-auto" />
              </div>
            )}

            <div
              className={`flex justify-between flex-grow items-start gap-x-2 gap-y-3 select-none mt-8 pb-4 ${
                isActiveCards ? "overflow-x-auto" : "overflow-x-hidden"
              }`}
            >
              {/* Render cards */}
              {columns.map((column, index) => (
                <div
                  className={`bg-white flex flex-col rounded-11 max-h-full overflow-hidden relative p-3 duration-500 ${
                    columnId === column.id
                      ? "grow"
                      : columnId === undefined
                      ? "flex-none w-80"
                      : "w-2 overflow-hidden h-52"
                  }`}
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-16 font-semibold">{column.title}</p>
                    {isActiveCards && (
                      <CgExpand
                        className="cursor-pointer rotate-90"
                        onClick={() =>
                          setColumnId((prev) =>
                            prev === undefined ? column.id : undefined
                          )
                        }
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-x-1 my-4 border-b border-gray-100 pb-4">
                    <SearchBox
                      placeholder={t("input.search.placeholder")}
                      classes={"w-full"}
                      onChange={(event) =>
                        handleFilteredSearch(
                          column.id,
                          event.target.value,
                          columns[0].data
                        )
                      }
                      disabled={!isActiveCards}
                    />
                    {column.id === "1" && (
                      <Button
                        classes={`!px-3 ${!isActiveCards && "!cursor-default"}`}
                        onClick={() =>
                          isActiveCards &&
                          handleOpenModal("createCandidate", column)
                        }
                      >
                        <MdOutlinePersonAddAlt1 size={18} />
                      </Button>
                    )}
                  </div>
                  <Droppable droppableId={index.toString()}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex flex-col gap-y-2 rounded-lg border-gray-200 h-full overflow-y-auto ${
                          columnId !== column.id && column.data.length > 0
                            ? ""
                            : "border-none"
                        }`}
                      >
                        {columnId === column.id ? (
                          <Table data={column.data} cols={column.cols} />
                        ) : column.id === "1" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 rounded-md bg-gray-50 hover:bg-gray-100 flex flex-col relative text-14">
                                        <div className="flex justify-between items-start">
                                          {item.name} {item.family}
                                          <span
                                            className="flex items-center gap-x-1 text-[#7E8299] p-1 rounded-md cursor-pointer text-14"
                                            onClick={() =>
                                              statusClickHandler(index + 1)
                                            }
                                          >
                                            <FiMoreHorizontal size={20} />
                                          </span>
                                        </div>
                                        <p
                                          className="text-xs text-custom-yellow-dark bg-custom-yellow-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                          onClick={() =>
                                            handleOpenModal(
                                              "changeStatus",
                                              item
                                            )
                                          }
                                        >
                                          {item.candidatePositionStatus?.title}
                                        </p>

                                        {/* Popup menu start */}
                                        <div
                                          className={`flex flex-col gap-y-2 duration-200 ease-in-out bg-white shadow-md text-sm border absolute right-3 top-11 rounded-md z-50 ${
                                            statusIndex === index + 1
                                              ? "visible opacity-100 translate-y-0 overflow-auto h-auto py-3 px-4"
                                              : "translate-y-6 opacity-0 invisible overflow-hidden h-0 py-0 px-0"
                                          }`}
                                        >
                                          <span className="flex">
                                            <TiTick
                                              color="#22c55e"
                                              size={18}
                                              className="-ml-2"
                                            />
                                            <span className="cursor-pointer text-green-500">
                                              CV reviewed
                                            </span>
                                          </span>
                                          <span className="cursor-pointer">
                                            HR interview
                                          </span>
                                          <span className="cursor-pointer">
                                            Technical interview
                                          </span>
                                        </div>
                                        {/* Popup menu end */}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "2" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 bg-gray-50 hover:bg-gray-100 text-14">
                                        <div className="flex flex-col gap-y-1">
                                          {item.name} {item.family}
                                          <p
                                            className="text-xs text-custom-purple-dark bg-custom-purple-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                            onClick={() =>
                                              handleOpenModal(
                                                "changeStatus",
                                                item
                                              )
                                            }
                                          >
                                            {
                                              item.candidatePositionStatus
                                                ?.title
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "3" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 bg-gray-50 hover:bg-gray-100 text-14">
                                        <div className="flex flex-col gap-y-1">
                                          <p>{item.name}</p>
                                          <div className="flex items-center gap-x-2">
                                            <p
                                              className="text-xs text-custom-red-dark bg-custom-red-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                              onClick={() =>
                                                handleOpenModal(
                                                  "changeStatus",
                                                  item
                                                )
                                              }
                                            >
                                              {
                                                item.candidatePositionStatus
                                                  ?.title
                                              }
                                            </p>
                                            <div
                                              className="bg-custom-gray-medium rounded-md px-2 py-1 cursor-pointer"
                                              onClick={() =>
                                                handleChangeStatus(item)
                                              }
                                            >
                                              <TbArrowBackUp color="#99a1b7" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : column.id === "4" ? (
                          column.data.length > 0 ? (
                            <>
                              {column.data.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="text-gray-700 p-3 bg-gray-50 hover:bg-gray-100 text-14">
                                        <div className="flex flex-col gap-y-1">
                                          {item.name} {item.family}
                                          <p
                                            className="text-xs text-custom-green-dark bg-custom-green-light rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                            onClick={() =>
                                              handleOpenModal(
                                                "changeStatus",
                                                item
                                              )
                                            }
                                          >
                                            {
                                              item.candidatePositionStatus
                                                ?.title
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </>
                          ) : (
                            <div className="border border-transparent"></div>
                          )
                        ) : (
                          column.id ===
                          "5" ? (
                            column.data.length > 0 ? (
                              <>
                                {column.data.map((item, index) => (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="text-gray-700 p-3 bg-gray-50 hover:bg-gray-100 text-14">
                                          <div className="flex flex-col gap-y-1">
                                            {item.name} {item.family}
                                            <p
                                              className="text-xs text-black bg-gray-300 rounded-md font-semibold w-fit px-2 py-1 cursor-pointer"
                                              onClick={() =>
                                                handleOpenModal(
                                                  "changeStatus",
                                                  item
                                                )
                                              }
                                            >
                                              {
                                                item.candidatePositionStatus
                                                  ?.title
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </>
                            ) : (
                              <div className="border border-transparent"></div>
                            )
                          ) : null
                        )}
                      </div>
                    )}
                  </Droppable>
                  <div
                    className={`bg-white w-full h-full absolute top-0 left-0 ${
                      columnId === undefined || columnId === column.id
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <div
                      className="w-max text-16 font-semibold absolute rotate-90 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer text-red-500"
                      onClick={() => setColumnId(column.id)}
                    >
                      {column.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
