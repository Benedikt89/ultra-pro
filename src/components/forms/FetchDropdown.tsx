import React, {useCallback, useEffect, useState} from "react";
import {Select, Tooltip} from 'antd';

import {Option} from "types/orders-types";

const getOption = (title: string, i: number = 0): Option => ({
  id: Math.random() + "opt_id",
  title: title + i
});

function delay(time: number, callback: () => void) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, callback), time)
  });
}

const getOptions = (title = "some option"): Option[] => Array(Math.floor(Math.random() * 11)).fill(null)
  .map((_, i) => getOption(title, i));

interface Props {
  className?: string;
  placeholder?: string;
  minWidth?: number;
  url: string;
  type?: string;
  style?: React.CSSProperties;
  onChange?: (value: Option | null, options: Option[]) => void;
  onBlur?: (value: Option | null) => void;
  initialValue?: Option | null;
  error?: boolean;
  initialOptions?: Option[] | null;
}

const FetchDropdown: React.FC<Props> = ({
                                          initialValue,
                                          type,
                                          url,
                                          style = {},
                                          onChange,
                                          onBlur,
                                          className,
                                          placeholder,
                                          minWidth = 200,
                                          error,
                                          initialOptions,
                                        }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<Option | null>(initialValue ?? null);
  const [options, setOptions] = useState<Option[]>(initialOptions ?? []);

  const handleChange = useCallback((value: string, option = {}) => {
    setValue({ id: value, title: option.children ?? '' });
    onChange && onChange({ id: value, title: option.children ?? '' }, options);
  }, [onChange, options]);

  useEffect(() => {
    const fetchOptions = async () => {
        try {
          setLoading(true);
          await delay(Math.random() + 900, () => {});
          setOptions(getOptions(type));
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
    };

    if (!initialOptions && !loading) {
      fetchOptions();
    }
  }, [url, type, initialOptions])

  return (
    <div className={className}>
      <Tooltip
        visible={!!error}
        title={error ? error : 'Required'}
        color="red"
      >
        <Select
          showSearch
          style={{ ...style, minWidth, ...(error && {borderColor: 'red', color: 'red'}) }}
          value={value?.id}
          placeholder={placeholder}
          defaultActiveFirstOption={false}
          onChange={handleChange}
          onBlur={() => onBlur && onBlur(value)}
          loading={loading}
          filterOption={(input, option) => {
            const val: string = typeof option?.children === "string" ? option?.children : "";
            return val.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {options.map(d => <Select.Option key={d.id}>{d.title}</Select.Option>)}
        </Select>
      </Tooltip>
    </div>
  )
};

export default React.memo(FetchDropdown);
