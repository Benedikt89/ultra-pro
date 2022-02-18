import React, {useEffect, useState} from "react";
import { Select } from 'antd';

interface Option {
  id: string
  label: string
}

const getOption = (i: number = 0): Option => ({
  id: Math.random() + "opt_id",
  label: "some option" + i
});

function delay(time: number, callback: () => void) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, callback), time)
  });
}

const getOptions = (): Option[] => Array(Math.floor(Math.random() * 11)).fill(null)
  .map((_, i) => getOption(i));

interface Props {
  className?: string;
  placeholder?: string;
  minWidth?: number;
  url: string;
}

const FetchDropdown: React.FC<Props> = ({url, className, placeholder, minWidth= 200}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<any>();
  const [options, setOptions] = useState<Option[]>([]);

  const handleChange = (value: any) => {
    setValue(value);
  };

  useEffect(() => {
    const fetchOptions = async () => {
        try {
          setLoading(true);
          await delay(Math.random() + 900, () => {});
          setOptions(getOptions());
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
    };

    if (!loading) {
      fetchOptions();
    }
  }, [url])

  return (
    <div className={className}>
      <Select
        showSearch
        style={{ minWidth }}
        value={value}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        onChange={handleChange}
        loading={loading}
        filterOption={(input, option) => {
          const val: string = typeof option?.children === "string" ? option?.children : "";
          return val.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
      >
        {options.map(d => <Select.Option key={d.id}>{d.label}</Select.Option>)}
      </Select>
    </div>
  )
};

export default React.memo(FetchDropdown);
