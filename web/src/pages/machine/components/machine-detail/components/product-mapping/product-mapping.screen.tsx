import React, { useRef, useState } from "react";
import { Table } from "reactstrap";
import { FcDeleteDatabase } from "react-icons/fc";
import "./product-mapping.scss";
import ProductMappingAdapter from "./product-mapping.adapter";
import CellTableItemScreen from "../../../../../../libraries/components/cell-table-item/cell-table-item";
import {
  DeleteProductMapIcon,
  EditProductMapIcon,
  PlusIcon,
} from "libraries/icons/icon";
import { ProductMappingProps } from "./product-mapping.props";
import Button from "libraries/components/button/Button";
import { PaginateComponent } from "libraries/components/paginate/paginate.component";
import { APP_CONFIGS } from "vending-core/common/app-config";
import { ConfirmModal } from "libraries/components/confirm-modal/confirm-modal";
import { ModalPopupComponent } from "libraries/components/modal-popup/modal-popup.components";
import { EditProductMapItemModal } from "pages/machine/components/modal-content/edit-product-map-item-modal/edit-product-map-item-modal";
import { AddProductModal } from "pages/machine/components/modal-content/add-product-modal/add-product-modal";
import LoadingSpinnerScreen from "libraries/components/loading-spinner/loading-spinner.screen";
import { InputV2 } from "pages/login/components/input/input";
import SearchInput from "pages/machine/components/search-input/search-input";

export const ProductMappingScreen = (props: ProductMappingProps) => {
  const { machine } = props;

  const {
    listProducts,
    page,
    PAGE_SIZE,
    setPage,
    totalPage,
    refConfirmModal,
    deleteProductMapItemData,
    indexItem,
    closeEditProductMapItemModal,
    openEditProductMapItemModal,
    refEditProductMapItemModal,
    refAddProductModal,
    openAddProductModal,
    closeAddProductModal,
    loading,
    searchText,
    setSearchText,
  } = ProductMappingAdapter(props);

  const showProductMapping = () => {
    if (loading) {
      return (
        <tr style={{ height: "100%" }}>
          <td colSpan={9}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <LoadingSpinnerScreen className="big" />
            </div>
          </td>
        </tr>
      );
    } else {
      if (listProducts.length > 0) {
        return listProducts.map((item: any, index: number) => {
          return (
            <tr key={index} style={{ height: 60 }}>
              {/* STT */}

              <CellTableItemScreen
                isTh={true}
                content={((page - 1) * PAGE_SIZE + index + 1).toString()}
                hasListOptions={false}
                isError={false}
                hasEditedByPm={false}
                listOptions={[]}
                style={{
                  width: "5%",
                }}
              ></CellTableItemScreen>

              {/* S???n ph???m */}

              <CellTableItemScreen
                hasEditedByPm={false}
                content={item?.product?.name}
                // className="w-200"
                style={{
                  width: "25%",
                }}
                canEdit={true}
                isError={false}
                child={
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <img
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 8,
                        objectFit: "contain",
                      }}
                      src={
                        APP_CONFIGS.URL_API +
                        "files/image/" +
                        item?.product?.imageDetail
                      }
                    />
                    <p style={{ flex: 1, textAlign: "left", marginLeft: 8 }}>
                      {item?.product?.name}
                    </p>
                  </div>
                }
                listOptions={listProducts}
                // getListOptions={ getListProducts }
                hasListOptions={true}
              ></CellTableItemScreen>

              {/* M?? s???n ph???m */}

              <CellTableItemScreen
                content={item?.product?.code}
                hasListOptions={false}
                isError={false}
                hasEditedByPm={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* Slot tr??n m??y */}

              <CellTableItemScreen
                content={item?.slotNo}
                hasListOptions={false}
                isError={false}
                hasEditedByPm={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* ?? s???n ph???m */}

              <CellTableItemScreen
                content={item.slotCode}
                hasEditedByPm={false}
                // className="w-200"
                canEdit={true}
                hasListOptions={false}
                isError={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* S??? l?????ng ?? ch???a */}

              <CellTableItemScreen
                hasListOptions={false}
                content={item.capacity}
                isError={false}
                hasEditedByPm={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* S??? l?????ng s???n ph???m */}

              <CellTableItemScreen
                content={item.remain}
                hasListOptions={false}
                isError={false}
                hasEditedByPm={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* Gi?? b??n ra */}

              <CellTableItemScreen
                content={item?.price || item?.product?.standardPrice}
                contentIsCurrency={true}
                hasListOptions={false}
                isError={false}
                hasEditedByPm={false}
                style={{
                  width: "10%",
                }}
              ></CellTableItemScreen>

              {/* Ch???c n??ng */}

              <CellTableItemScreen
                style={{
                  width: "10%",
                }}
                child={
                  <div
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <EditProductMapIcon
                      className="action_icon"
                      style={{ marginRight: 14 }}
                      onClick={() => openEditProductMapItemModal(index)}
                    />
                    <DeleteProductMapIcon
                      className="action_icon"
                      onClick={() => deleteProductMapItemData(item.id)}
                    />
                  </div>
                }
                content={""}
                hasListOptions={false}
                hasEditedByPm={false}
                isError={false}
              ></CellTableItemScreen>
            </tr>
          );
        });
      } else {
        return (
          <tr>
            <td colSpan={9}>
              <div className="null-data">
                <FcDeleteDatabase
                  style={{ width: "10%", height: "10%" }}
                  className="img-40"
                ></FcDeleteDatabase>
                <p>Ch??a c?? product map cho m??y n??y</p>
              </div>
            </td>
          </tr>
        );
      }
    }
  };

  return (
    <div className="machine-product-mapping">
      <div className="machine-product-mapping-header">
        <p className="title">Danh s??ch s???n ph???m</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SearchInput hint="T??m ki???m" onChange={setSearchText} />
          <Button
            children={
              <div
                onClick={openAddProductModal}
                style={{ display: "flex", alignItems: "center" }}
              >
                <i style={{ height: 24, width: 24 }}>
                  <PlusIcon />
                </i>
                <p style={{ marginLeft: "8px", marginBottom: 0 }}>
                  Th??m s???n ph???m
                </p>
              </div>
            }
            background={"#00BAB5"}
            textColor={"#fff"}
            borderColor={"none"}
            padding={""}
          />
        </div>
      </div>
      {/* <ErrorBoundary> */}
      <>
        <div className="machine-product-mapping__table mt-2">
          <Table
            striped
            bordered
            style={{
              height: loading || listProducts.length === 0 ? "100%" : "",
            }}
          >
            <thead>
              <tr className="table__header">
                {/* <th className="checkbox">
                  <input type="checkbox" />
                </th> */}
                <th style={{ width: "5%" }}>
                  <span>STT</span>
                </th>
                <th style={{ width: "25%" }}>
                  <span>S???n ph???m</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>M?? s???n ph???m</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>Slot tr??n m??y</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>?? s???n ph???m</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>S??? l?????ng ?? ch???a</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>S??? l?????ng s???n ph???m</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>Gi?? b??n ra</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span>Ch???c n??ng</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {showProductMapping()}
              {/* <tr></tr> */}
            </tbody>
          </Table>
        </div>
        {/* <div style={{ flex: 1 }} /> */}
        <PaginateComponent
          totalPage={totalPage}
          currenPage={page}
          onChange={setPage}
        />
      </>

      {/* </ErrorBoundary> */}
      <div className="d-flex justify-content-between align-items-center"></div>
      <ConfirmModal ref={refConfirmModal} />
      <ModalPopupComponent
        title="Ch???nh s???a s???n ph???m"
        body={
          <EditProductMapItemModal
            indexItem={indexItem}
            closeModal={closeEditProductMapItemModal}
            machine={machine}
            listProductMapItem={listProducts}
          />
        }
        ref={refEditProductMapItemModal}
      />
      <ModalPopupComponent
        title="Th??m s???n ph???m"
        body={
          <AddProductModal
            machine={machine}
            closeModal={closeAddProductModal}
          />
        }
        ref={refAddProductModal}
      />
    </div>
  );
};

// export default React.memo(ProductMappingScreen);
