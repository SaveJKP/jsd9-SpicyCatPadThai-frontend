export default function Catalog() {
  return (
    <div
      className="fixed inset-0 z-10 flex w-[100%] items-start justify-center backdrop-blur-sm"
      // aria-labelledby={`${id}-label`} // ระบุ label สำหรับ Screen Reader
    >
      <div className="bg-box justufy-center mt-16 flex w-[40%] min-w-[355px] flex-col items-center gap-[24px] rounded-lg p-6 shadow-lg">
        <h1>SERIES</h1>
        <img
          className="h-[40%] w-[50%] bg-cover"
          src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQlO_2ts2YDGtpdafB8JDZzGVfyKlmFCn7paIJmTsKhfbev0I3O-OoMwgHJUDjSTc-KbjZge4_FgB2BUqVblVM"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis natus
          non fuga, dignissimos dolorum quas cum mollitia assumenda inventore
          magnam laboriosam officiis, optio adipisci doloribus omnis. Saepe
          totam provident cumque.
        </p>
        <div className="bg-background w-full p-6">
          <h3>Volume</h3>
          <select
            name="sdfdsfs"
            id="dsfsf"
            className="bg-radio w-full overflow-y-auto"
          >
            <option value="">dsfsdfsdf</option>
            <option value="">sdfsdfsd</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
            <option value="">sdfsdfsdf</option>
          </select>
        </div>
      </div>
    </div>
  );
}
