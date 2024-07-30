import React from "react";
import { useCallback } from "react";
import { Stack, Text, TextInput } from "@sanity/ui";
import { set, unset, useFormBuilder, useFormValue } from "sanity";

export const DoorsOpenInput = (props: any) => {
  const { elementProps, onChange, value = 45} = props;
  const startEvent = useFormValue(['date'])
  const startEventDate = new Date(startEvent as string);

  const handleChange = useCallback(
    (event: InputEvent) => {
      const nextValue = (event?.currentTarget as HTMLInputElement)?.value;
      const numericValue = nextValue ? Number(nextValue) : 0;
      if (!isNaN(numericValue)) {
        onChange(numericValue !== undefined ? set(numericValue) : unset());
      }
    },
    [onChange]
  );

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        type="number"
        onChange={handleChange}
        value={Number(value)}
      />
        <Text onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Se abrirán las puertas a las{' '}
          {
            new Intl.DateTimeFormat('es-CL', {
              hour: 'numeric',
                          minute: 'numeric',
              timeZone: 'America/Santiago',
            }).format(startEventDate.setMinutes(startEventDate.getMinutes() - value))
          }
        </Text>

    </Stack>
  )
};
