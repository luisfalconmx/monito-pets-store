import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/services";
import { removeDuplicates, formatCurrency } from "@/utils";
import {
  SizeSelector,
  ColorSelector,
  QuantitySelector,
  Wishlist,
} from "@/components";
import IconArrowLeft from "@/assets/icons/icon-arrow-left.svg";
import { blurImage } from "@/config/blurImage";

interface ProductProps {
  params: {
    slug: string;
  };
  searchParams: {
    size?: string;
    color?: string;
  };
}

export default async function Product({ params, searchParams }: ProductProps) {
  const data = await getProductBySlug(params.slug);
  let selectedVariant;

  const getVariants = (term: string) => {
    if (data?.productByHandle?.variants) {
      const allVariants = data.productByHandle.variants.nodes.map((i) => {
        const target = i.selectedOptions.find(
          (i) => i.name.toLowerCase() === term
        );

        if (target) return target.value;
        return "";
      });

      return removeDuplicates(allVariants);
    } else {
      return [];
    }
  };

  const sizeVariants = getVariants("size").filter((i) => i !== "");
  const colorVariants = getVariants("color").filter((i) => i !== "");

  const variantFound = data?.productByHandle?.variants.nodes.find((variant) => {
    const availableVariants = variant.selectedOptions.map((i) => {
      return i.name.toLowerCase(), i.value.toLowerCase();
    });

    if (searchParams.size && searchParams.color) {
      return (
        availableVariants.includes(
          searchParams.size?.toLowerCase() as string
        ) &&
        availableVariants.includes(searchParams.color?.toLowerCase() as string)
      );
    }

    if (searchParams.size) {
      return availableVariants.includes(
        searchParams.size?.toLowerCase() as string
      );
    }

    if (searchParams.color) {
      return availableVariants.includes(
        searchParams.color?.toLowerCase() as string
      );
    }

    return false;
  });

  if (variantFound) {
    selectedVariant = variantFound;
  } else {
    selectedVariant = data?.productByHandle?.variants.nodes[0];
  }

  const hasOnlyDefaultVariant = data?.productByHandle?.hasOnlyDefaultVariant;
  const merchandiseId = selectedVariant?.id as string;
  const defaultSize = selectedVariant?.selectedOptions.find(
    (i) => i.name.toLowerCase() === "size"
  );
  const defaultColor = selectedVariant?.selectedOptions.find(
    (i) => i.name.toLowerCase() === "color"
  );
  let productImage = selectedVariant?.image?.url
    ? selectedVariant?.image?.url
    : data?.productByHandle?.featuredImage?.src;

  let title = data?.productByHandle?.title;
  let price = selectedVariant?.price || 0;
  let availableStock = selectedVariant?.inventoryQuantity || 0;

  return (
    <main className="mt-6 mb-24">
      <section className="mx-6 flex justify-between mb-8 relative">
        <Link
          href="/"
          className="p-3 bg-pearl rounded-full cursor-pointer  block w-fit"
        >
          <Image src={IconArrowLeft} alt="" width={24} height={24} />
        </Link>

        <Wishlist
          image={productImage}
          name={title as string}
          price={price}
          merchandiseId={data?.productByHandle?.id as string}
          link={`/products/${data?.productByHandle?.handle}`}
        />
      </section>

      <section className="mx-6 mb-6 flex flex-nowrap overflow-auto space-x-2">
        <Image
          src={productImage}
          alt={title || ""}
          width={400}
          height={400}
          className="rounded-lg h-[320px] object-cover object-top w-full"
          placeholder="blur"
          blurDataURL={blurImage}
        />
      </section>

      <section className="mx-6">
        <h1 className="font-bold text-2xl mb-4">{title}</h1>
        <div className="flex items-center space-x-2 mb-6">
          <b className="font-bold text-2xl text-primary  block">
            {formatCurrency(price)}
          </b>
          {availableStock <= 0 && (
            <span className="text-red-500 font-bold text-xl">
              - out of stock
            </span>
          )}
        </div>
      </section>

      <section className="mx-6 mb-8 flex flex-col space-y-4">
        {!hasOnlyDefaultVariant && sizeVariants.length > 0 && (
          <SizeSelector
            defaultValue={defaultSize?.value || ""}
            sizes={sizeVariants}
          />
        )}
        {!hasOnlyDefaultVariant && colorVariants.length > 0 && (
          <ColorSelector
            defaultValue={defaultColor?.value || ""}
            colors={colorVariants}
          />
        )}

        <QuantitySelector
          name={title as string}
          merchandiseId={merchandiseId}
          defaultQuantity={availableStock ? 1 : 0}
          availableStock={availableStock}
          unitaryPrice={price}
          image={productImage}
          size={hasOnlyDefaultVariant ? "" : defaultSize?.value}
          color={hasOnlyDefaultVariant ? "" : defaultColor?.value}
        />
      </section>

      <section className="mx-6 mb-12">
        <h2 className="mb-3 text-xl font-bold">Description</h2>
        <p className="mb-12">{data?.productByHandle?.description}</p>

        <h2 className="mb-3 text-xl font-bold">Shipping & Returns</h2>
        <p>Free starndard shipping and free 60-day returns</p>
      </section>
    </main>
  );
}
