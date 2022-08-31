import {
  AudioOutlined,
  CalendarOutlined,
  CloseOutlined,
  ContactsOutlined,
  CustomerServiceOutlined,
  ExpandAltOutlined,
  ExportOutlined,
  FormOutlined,
  HolderOutlined,
  PhoneOutlined,
  PlusOutlined,
  PushpinOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Button, { BUTTON_TYPE } from "../../button/button";
import Info from "../../info/info";
import "./index.scss";

export default function Action() {
  const [showExpand, setShowExpand] = useState(true);
  return (
    <div className="actions">
      <h2>Actions</h2>

      <section className="action">
        <div className="item ">
          <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<AudioOutlined />} />
          <Button
            buttonType={BUTTON_TYPE.b2}
            onClick={() => {}}
            icon={<VideoCameraOutlined />}
          />{" "}
          <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<PhoneOutlined />} />
          <Button
            buttonType={BUTTON_TYPE.b2}
            onClick={() => {}}
            icon={<CustomerServiceOutlined />}
          />
        </div>

        <div className="item ">
          <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<CloseOutlined />} />
          <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<UserOutlined />} />
          <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<SearchOutlined />} />
        </div>

        <Info>
          <p>Augment your rooms with added functionality of Actions</p>
        </Info>
        {showExpand && (
          <>
            <div className="item">
              <h3>Form</h3>
              <div className="buttons">
                <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<FormOutlined />} />
              </div>
            </div>

            <div className="item">
              <h3>Export</h3>
              <div className="buttons">
                <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<ExportOutlined />} />
              </div>
            </div>

            <div className="item">
              <h3>Queue</h3>
              <div className="buttons">
                <Button
                  buttonType={BUTTON_TYPE.b2}
                  onClick={() => {}}
                  icon={<ContactsOutlined />}
                />
              </div>
            </div>

            <div className="item">
              <h3>Pins</h3>
              <div className="buttons">
                <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<PushpinOutlined />} />
              </div>
            </div>

            <div className="item add">
              <div className="buttons">
                <Button buttonType={BUTTON_TYPE.b2} onClick={() => {}} icon={<PlusOutlined />} />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
