import React, { forwardRef, HTMLAttributes } from "react"; // Assuming this is imported from another file
import { MapCompareComponent } from "./tables";
import LogoIcon from "../../assets/icons/newlogo.svg";

interface ExtraProps {
  keys?: any;
  mapCountries?: any;
  selectedTools?: any;
  newTools?: any;
}

type Props = ExtraProps & HTMLAttributes<HTMLDivElement>;

const PrintableComponent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const createMarkup = (desc) => {
    return { __html: desc };
  };
  const keys = props?.keys || [];
  const mapCountries = props?.mapCountries || [];
  const selectedTools = props?.selectedTools || [];
  const newTools = props?.newTools || [];
  return (
		<div ref={ref} className="w-full">
			<div className="items-start gap-14 no-break">
				<div className="w-full">
					{selectedTools?.one?.toolName && selectedTools?.two?.toolName && (
						<div className="pb-4">
							<h4 className="text-base font-medium text-[#000929]">
								Coverage of {selectedTools?.one?.toolName} against{" "}
								{selectedTools?.two?.toolName} across the region.
							</h4>
						</div>
					)}
					<div>
						<div className="space-x-4 flex">
							<h4 className="text-base font-medium text-[#000929]">Key:</h4>
							{keys?.map((key, index) => (
								<div key={index} className="flex items-center gap-2">
									<div
										style={{ backgroundColor: key?.color }}
										className="h-3 rounded-tr-3xl w-12"></div>
									<h6 className="text-sm font-normal capitalize text-da-blue-600">
										{key?.name}
									</h6>
								</div>
							))}
						</div>
					</div>
					<div className="h-[432px] w-full noscroll mt-3 no-break">
						<MapCompareComponent
							mapCountries={mapCountries}
							selectedTools={selectedTools}
							keys={keys}
						/>
					</div>
				</div>
				<div className="w-full mt-10">
					<div className="grid grid-cols-2 gap-5">
						{newTools?.map((t, index) => (
							<div
								key={index}
								style={{
									background: t?.bg,
									border: `1px solid ${t?.border}`,
								}}
								className="min-h-48 p-5 w-full rounded-xl no-break">
								<h4 className="text-base font-bold text-[#334155]">
									{t?.name}
								</h4>
								<p
									className="mt-3 text-sm font-normal text-[#000929] line-clamp-6"
									dangerouslySetInnerHTML={createMarkup(t?.desc)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="fixed bottom-3 right-4 print:block hidden no-break">
				<div className="flex gap-4 items-center">
					<h5 className="text-xl font-medium text-da-blue-600">Powered By</h5>
					<img src={LogoIcon} alt="Logo" className="w-24" />
				</div>
			</div>
		</div>
	);
});

export default PrintableComponent;
